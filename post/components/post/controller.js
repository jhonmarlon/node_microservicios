const { nanoid } = require('nanoid');

const TABLA = 'post';

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function create(user, postData) {
        const post  = {
            id: postData.id ? postData.id : nanoid(),
            text: postData.text,
            user
        }

        return store.upsert(TABLA, post)
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    return {
        list,
        create,
        get
    }
}