const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

export const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(cors());
