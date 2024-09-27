const express = require('express');
var cors = require('cors');
const mysql = require('./connection');
const appusersRoute = require('./routes/appusers');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/appusers', appusersRoute);
module.exports = app;
