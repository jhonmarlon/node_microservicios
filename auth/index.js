const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign({data}, secret);
}

const check = {
    own: function(req, owner) {
        const {data} = decodeHeader(req);
        // COMPROBAR SI ES O NO PROPIO
        if (data.id !== owner) {
            throw error('No puedes hacer esto', 401);
            //throw new Error('No puedes hacer esto');
        }
    },
    logged: function(req) {
        const {data} = decodeHeader(req);
    }
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';

    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded.data;

    return decoded;
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato de token inválido', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function verify(token) {
    return jwt.verify(token, secret);
}


module.exports = {
    sign,
    check
    
}