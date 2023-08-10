const { Router, request } = require('express');

const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('../../../api/components/user/secure');

const router = Router();

router.get('/', list);
router.post('/', secure('post'), create);
router.get('/:id', get);

function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
}

function create(req, res, next) {
    Controller.create(req.user.id, req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next)
}


function get(req, res, next) {
    Controller.get(req.params.id)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next)
}

module.exports = router;