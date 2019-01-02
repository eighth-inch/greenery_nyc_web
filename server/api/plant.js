const util = require('util');
const router = require('express').Router();
const { Plant } = require('../db').models;

router.get('/', (req, res, next) => {
    return Plant.findAll()
        .then(plants => res.send({ plants }));
});

router.post('/', (req, res, next)=> {
    console.log('the request is: ' + util.inspect(req));
    console.log('the request body is: ' + util.inspect(req));
    const { plant } = req.body;
    const { name, light_required } = plant;
    return Plant.create({ name, light_required })
        .then(_plant => res.send(_plant));
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    return Plant.findOne({ where: { id } })
        .then(_plant => {
            console.log('plant is : ' + _plant)
            res.send({ plant: _plant })
        });

        //Needs not found handling
});

router.delete('/:id', (req, res, next)=> {
    const { id } = req.params;

    return Plant.destroy({ where: { id } })
        .then(res.sendStatus(200));
})

module.exports = router;