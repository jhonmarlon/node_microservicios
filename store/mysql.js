const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if(err) {
            console.error('[db err]', err);
            setTimeout(handleConnection, 2000);
        }else {
            console.log('DB Connected!')
        }
       
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        }else{
            throw err;
        }
    })
}

handleConnection();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function upsert(table, userData) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, userData, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

function edit(table, userNewdata) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [userNewdata, userNewdata.id], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

function query(table, query, join) {
    console.log(join)
    console.log(query)
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        console.log(key)
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if(err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

function follow(table, followData) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, followData, (err, result) => {
            if(err) return reject(err);
            resolve(result)
        })
    })
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id=?`, id, (err, result) => {
            if(err) return reject(err);
            resolve(result)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    edit,
    query,
    follow,
    remove
}