const router = require('express').Router();
const { User } = require('../db').models;

router.get('/', (req, res, next) => {
    res.sendStatus(200);
});

module.exports = router;