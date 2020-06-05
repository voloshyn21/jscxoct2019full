require('dotenv').config();

const express = require('express');

const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());


const router = require('./routes');


app.use(router);


app.listen(process.env.PORT || 3000, () => console.log(`Server was started on port: ${process.env.PORT || 3000}`));

process.on("unhandledRejection", () => process.exit(0));
