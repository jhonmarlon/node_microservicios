const express = require('express');
const app = express();

const config = require('../config');
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en el puerto ', config.mysqlService.port)
})