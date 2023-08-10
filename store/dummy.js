const db = {
    'user': [
        { id: '1', name: 'Marlon', username: 'marlon123' }
    ]
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {

    if(!db[table]) db[table] = [] //Si la tabla no existe, la crea como un array vacio

    db[table] = [...db[table], data];
    console.log('Database dummy actual: ', db)
    return db[table].filter( item => item.id === data.id )
}

async function remove(table, id) {
    const col = db[table];
    col.forEach((element, index) => {
        if(element.id === parseInt(id)) col.splice(index, 1);
    });
    console.log(col);
    return true;
}

async function edit(table, userNewData) {
    const users = await list(table);
    console.log('esta es la lista: ', users)
    const updatedUser = users.map((user, index) => {
        if(user.id === userNewData.id) {
            console.log('son iguales: ', user.id , userNewData.id)
            db[table][index] = { ...userNewData }
            return db[table][index];
        }
    })

    return updatedUser;
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];

    console.log(table, key)
    console.log(q)
    console.log(col)

    return col.filter(item => item[key] === q[key])
}

module.exports = {
    list, 
    get, 
    upsert, 
    remove,
    edit,
    query
}