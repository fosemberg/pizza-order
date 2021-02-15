import { config } from "dotenv"
config();
import {app} from './expressApp';
import {DB_FULL_PATH} from "./constants";
import {SERVER_HTTP_PORT} from "../config/env";
import { orderSizeInfo, toppings } from './data';

const DataStore = require('nedb');

console.info('Server starting...');

const db = new DataStore({
  filename: DB_FULL_PATH,
  autoload: true,
});

app.get(
  '/toppings',
  (req, res) => {
    setTimeout(() => {
      res.json(toppings)
    }, 1500)
  }
)

app.get(
  '/orderSizeInfo',
  (req, res) => {
    setTimeout(() => {
      res.json(orderSizeInfo)
    }, 750)
  }
)

app.listen(SERVER_HTTP_PORT);
console.info(`Server http API available on: http://localhost:${SERVER_HTTP_PORT}`);
