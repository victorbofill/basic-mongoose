const router = require('express').Router();
const Friend = require('../models/Friend');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Friend.create(req.body)
            .then(friend => res.json(friend))
            .catch(err => errorHandler(err, req, res));
    });