require('dotenv').config();

const express = require('express');
const expressFileupload = require('express-fileupload');
const path = require('path');
const morgan = require('morgan');

const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(morgan('dev'));

app.use(expressFileupload());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), 'public')));


const {PORT} = require('./configs');
const router = require('./routes');


app.use(router);


app.listen(PORT, () => console.log(`Server was started on port: ${PORT}`));

process.on("unhandledRejection", () => process.exit(0));

const {cron} = require('./crons');
cron();
