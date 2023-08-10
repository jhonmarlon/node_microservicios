const request = require('request');

function createRemoteDB(host, port) {

    const URL = 'http://' + host + ':' + port;

    function list(table) {
        return req('GET', table)
    }

    function get(table, id) {
        return req('GET', table, id)
    }

    function upsert(table, data) {
        return req('POST', table, data)
    }

    function remove(table, id) {
        return req('DELETE', table, id)
    }
    // function edit(table, data)
    // function query(table, query, join)

    function req(method, table, data) {

        const id = (method === 'GET' || method === 'DELETE') && data ? data : ''; // Validando si la data es un id
        let body = (method !== 'GET' && method !== 'DELETE') && data ? JSON.stringify(data) : '';

        console.log('llamando remoto para peticion a microservicio de mysql')
        let url = URL + '/' + table + '/' + id;

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message)
                }

                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        })
    }

    return {
        list,
        get,
        upsert,
        remove
    } 
}

module.exports = createRemoteDB;