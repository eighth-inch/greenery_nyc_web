const router = require('express').Router();
const plant = require('./plant');
const user = require('./user');


router.use('/plants', plant);
router.use('/user', user);

module.exports = router;