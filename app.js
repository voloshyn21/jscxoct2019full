const express = require('express');

const db = require('./dataBase').getInstance();
db.setModels();

const router = require('./routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded());


app.use(router);


app.listen(3000, () => console.log('server was started on port 3000'));
