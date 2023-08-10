const express = require('express');

const config = require('../config.js');
const post = require('./components/post/router.js');
const errors = require('../network/errors.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Router
app.use('/api/post', post);

app.use(errors); // debe de ir de último tal cual esta acá

app.listen(config.post.port, () => {
    console.log('Servicio posts escuando en el puerto ', config.post.port);
});