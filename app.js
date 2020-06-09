require('dotenv').config();

const {PORT} = require('./configs');
const express = require('express');
const morgan = require('morgan');

const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());


const router = require('./routes');


app.use(router);


app.listen(PORT, () => console.log(`Server was started on port: ${PORT}`));

process.on("unhandledRejection", () => process.exit(0));
