const { Router } = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = Router();

router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', post);
router.delete('/:id', deleteUser);
router.put('/', secure('update'), edit);

async function list (req, res, next) { 
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
    // try {
    //     const list = await Controller.list();
    //     response.success(req, res, list, 200);
    // } catch (error) {
    //     response.error(req, res, error.message, 500);
    // }
}

async function get (req, res, next) { 
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
    // try {  
    //     const user = await Controller.get(req.params.id);
    //     response.success(req, res, user, 200);
    // } catch (error) {
    //     response.error(req, res, error.message, 500);
    // }
}

async function post (req, res, next) { 
    Controller.upsert(req.body)
        .then((addedUser) => {
            response.success(req, res, addedUser, 200);
        })
        .catch(next)
    // try {
    //     const addedUser = await Controller.upsert(req.body); 
    //     response.success(req, res, addedUser, 200);
    // } catch (error) {
    //     response.error(req, res, error.message, 500);
    // }
}

async function deleteUser (req, res, next) { 
    Controller.remove(req.params.id)
        .then((deletedUser) => {
            response.success(req, res, deletedUser, 200);
        })
        .catch(next);
    // try {
    //    const deletedUser = await Controller.remove(req.params.id);
    //    response.success(req, res, deletedUser, 200);
    // } catch (error) {
    //     response.error(req, res, error.message, 500);
    // }
}

async function edit (req, res, next) { 
    Controller.edit(req.body)
        .then((editeduser) => {
            response.success(req, res, editeduser, 200);
        })
        .catch(next)
    // try {
    //     const userNewData = req.body;
    //     const editedUser = await Controller.edit(userNewData);
    //     response.success(req, res, editedUser, 200);
    // } catch (error) {
    //     response.error(req, res, error.message, 500);
    // }
}

function follow (req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next)
}

function following (req, res, next) {
    Controller.following(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
}

module.exports = router;

