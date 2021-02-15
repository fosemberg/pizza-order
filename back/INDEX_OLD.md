import { config } from "dotenv"
config();
import {Request, Response} from 'express';
import {app} from './expressApp';
import {
Agents,
IBody,
IParams,
ITask,
} from './types';
import {DB_FULL_PATH} from "./constants";
import * as WS from "ws";
import {SERVER_WS_PORT, SERVER_HTTP_PORT, REPOSITORY_URL} from "../config/env";
import { orderSizeInfo, toppings } from './data';

const {
MESSAGE,
} = require('./constants');
const {createMessageObjectString} = require('./configUtils');
const DataStore = require('nedb');
const axios = require(`axios`);

const repositoryId = 'server-info';

console.info('Server starting...');

const db = new DataStore({
filename: DB_FULL_PATH,
autoload: true,
});

const getInfoFromRepositoryUrl = (url: string): IRepositoryInfo => {
console.log('getInfoFromGithubUrl:url', url);
const urlArr = url.split('/');
const repositoryName = urlArr.pop().replace(/\.git$/,'');
const repositoryOwner = urlArr.pop();
return {repositoryName, repositoryOwner};
}

const sendBuildRequestToAgent = ({buildId, repositoryUrl, commitHash, command}: IBuildRequest, agentUrl: string) => {
const type = 'get';
const body = {};
const commandUrl = 'build';
const _url = `${agentUrl}/${commandUrl}/${buildId}/${encodeURIComponent(repositoryUrl)}/${commitHash}/${command}`;

console.info(`sendBuildRequestToAgent: ${_url}`);
changeAgentStatusByUrl(agentUrl, false);

return axios[type](_url, body)
.then((response) => {
console.info(type, _url);
console.info('Agent is alive');
console.info(response.data);
})
.catch((error) => {
console.error(type, _url);
console.error('Agent not response');
console.error(error.response.data);
});
};

const sendBuildRequestToAgentIfNeed = (host: string, port: number) => {
if (buildRequests.length === 0) {
makeAgentFree(host, port);
} else {
sendBuildRequestToAgent(buildRequests.pop(), generateUrl(host, port)).catch(console.error);
}
};

const sendMessage = (message: Message) => {
wss.clients.forEach(function each(client) {
let outJson = JSON.stringify(message);
client.send(outJson);
console.log('Send: ' + outJson);
});
};

const agents: Agents = {};
const buildRequests: IBuildRequest[] = [];

const generateUrl = (host: string, port: number) => `${host}:${port}`;

const changeAgentStatusByUrl = (url: string, isFree: boolean) => {
agents[url] = isFree;
console.info(`Agent: ${url} {isFree: ${isFree}}`);
};

const changeAgentStatus = (host: string, port: number, isFree: boolean) => {
changeAgentStatusByUrl(generateUrl(host, port), isFree);
};

const registryAgent = (host: string, port: number) => {
console.info(`Registry new agent: ${generateUrl(host, port)}`);
changeAgentStatus(host, port, false);
};

const makeAgentFree = (host: string, port: number) => {
changeAgentStatus(host, port, true);
};

const getFreeAgent = () => {
for (const agent in agents) {
if (agents.hasOwnProperty(agent) && agents[agent]) {
return agent;
}
}
return false;
};




app.post(
'/notify_agent',
(
{
body: {
host,
port,
},
}: IBody<IWithHost & IWithPort>,
res: Response
) => {
registryAgent(host, port);
res.json({repositoryUrl: REPOSITORY_URL});
}
);

// сказать серверу, что он свободен
// освободить агента или дать ему новое задание
app.post(
'/notify_agent_free',
(
{
body: {
host,
port,
},
}: IBody<IWithHost & IWithPort>,
res: Response
) => {
sendBuildRequestToAgentIfNeed(host, port);
res.json({isAlive: true});
}
);

// сохранить результаты сборки и сообщить об этом клиента
// В параметрах: id сборки, статус, stdout и stderr процесса.1
app.post(
'/notify_build_result',
(
{
body: build,
}: IBody<IBuildResponse>,
res: Response
) => {
const {repositoryUrl, ...buildWithoutRepositoryUrl} = build;
const body = {
...buildWithoutRepositoryUrl,
...getInfoFromRepositoryUrl(repositoryUrl),
}
sendMessage({
type: TYPE.EVENT,
action: ACTION.BUILD_RESULT,
body,
});

    const {buildId, status, stdOut, startDate, endDate} = build;

    console.info('notify_build_result', JSON.stringify(build));
    db.update({_id: buildId}, {$set: {status, stdOut, startDate, endDate}});
    res.json({buildId, isAlive: true});
}
);

// отдать результаты сборки.
app.get(
'/get_build_results/',
(
req: Request,
res: Response
) => {
db.find({}).sort({startDate: 1}).exec((err, buildResults) => {
res.json(
buildResults.map(({_id, status, repositoryUrl, commitHash}) => ({buildId: _id, status, ...getInfoFromRepositoryUrl(repositoryUrl), commitHash}))
);
});
}
);

// отдать детализированный результат сборки.
app.get(
'/get_build_detailed_result/:buildId',
(
{
params: {buildId},
}: IParams<IWithBuildId>,
res: Response
) => {
db.findOne({_id: buildId}).exec((err, buildResult) => {
const {_id: buildId, ..._buildResult} = buildResult;
res.json({..._buildResult, buildId});
});
}
);

//  WS

const WSS = WS.Server;
const wss = new WSS({port: SERVER_WS_PORT});

wss.on('connection', function (socket) {
console.log('WS: Opened new connection');

let json = createMessageObjectString(MESSAGE.CONNECTED);
socket.send(json);
console.log('Sent: ' + json);

socket.on('close', function () {
console.log('Closed Connection');
});
});

app.listen(SERVER_HTTP_PORT);

console.info(`Server http API available on: http://localhost:${SERVER_HTTP_PORT}`);

console.info(`Server WS API available on: ws://localhost:${SERVER_WS_PORT}`);
