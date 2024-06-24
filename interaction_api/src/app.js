const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./versions/v1/api');
const app = express();

app.use(morgan('combined'));
app.use(cors({
	origin: "*"
}));
app.use(express.json());
app.use("/api/v1", api);
module.exports = app;
