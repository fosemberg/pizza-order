import { config } from "dotenv"
config();
import {app} from './expressApp';
import {DB_FULL_PATH} from "./constants";
import {SERVER_HTTP_PORT} from "../config/env";
import { orderSizeInfo, toppings } from './data';
import { IBody } from './types';
import { Order } from './types/apiTypes';

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

app.post(
  '/newOrder',
  (
    {
      body,
    }: IBody<Order>,
    res
  ) => {
    console.log('new order', body);
    db.insert(
      body,
      (err, newDoc) => {
        if (err) {
          res.status(500)
          res.json({isOk: false})
          console.error(err)
        }
        setTimeout(() => {
          res.send('Your pizza will start cook soon!')
        }, 750)
      }
    )
  }
)

app.listen(SERVER_HTTP_PORT);
console.info(`Server http API available on: http://localhost:${SERVER_HTTP_PORT}`);
