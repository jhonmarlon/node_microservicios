const express = require('express');

const config = require('../config.js');
const user = require('./components/user/router.js');
const auth = require('./components/auth/router.js');
const errors = require('../network/errors.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Router
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors); // debe de ir de último tal cual esta acá

app.listen(config.api.port, () => {
    console.log('API escuando en el puerto ', config.api.port);
});