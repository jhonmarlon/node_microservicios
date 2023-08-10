const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', update);
router.delete('/:table/:id', remove);

async function list(req, res , next) {
    const datos = await Store.list(req.params.table);
    response.success(req , res , datos, 200)
}
async function get(req, res , next) {
    const datos = await Store.get(req.params.table, req.params.id);
    response.success(req , res , datos, 200)
}
async function insert(req, res , next) {
    const datos = await Store.upsert(req.params.table, req.body);
    response.success(req , res , datos, 200)
}
async function update(req, res , next) {
    const datos = await Store.edit(req.params.table, req.body);
    response.success(req , res , datos, 200)
}
async function remove(req, res, next) {
    const datos = await Store.remove(req.params.table, req.params.id);
    response.success(req , res , datos, 200)
}

module.exports = router;