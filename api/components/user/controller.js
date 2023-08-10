const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLA = 'user';

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function list () {
        console.log('desde controller de user en la api')
        return store.list(TABLA);
    }

    function get (id) {
        return store.get(TABLA, id);
    }   

    async function upsert (userData) {
        const user = {
            ...(userData.id) ? { id: userData.id } : { id: nanoid() },
            name: userData.name,
            username: userData.username
        }

        if(userData.password || userData.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: userData.password
            })
        }

        return store.upsert(TABLA, user);
    }

    function remove (id) {
        return store.remove(TABLA, id);
    }
    
    async function edit (userNewData) {
        const updatedUser =  await store.edit(TABLA, userNewData);
        return updatedUser;
    }

    function follow (from , to) {
       return store.follow(TABLA + '_follow', {
            user_from: from,
            user_to: to
       })
    }

    async function following (id) {
        const join = {}
        join[TABLA] = 'user_to' // { user: 'user_to' }
        const query = { user_from: id };

        return await store.query(TABLA + '_follow', query, join)
    }

    return {
        list,
        get,
        upsert,
        remove,
        edit,
        follow,
        following
    }
}

