const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

const error = require('../../../utils/error');

module.exports = function (injectedStore) {
    let store = injectedStore;

    if(!injectedStore) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        console.log('Desde login: ')
        console.log('username: ', username)
        console.log('password: ', password)

        const data = await store.query(TABLA, { username: username });
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if(sonIguales === true) {
                    //Generamos token
                    return auth.sign(data)
                } else {
                    throw error('Información inválida', 400);
                }
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData)
    }

    return {
        upsert,
        login
    }
}