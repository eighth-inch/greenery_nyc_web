const router = require('express').Router();
const { Plant } = require('../db').models;

router.get('/', (req, res, next) => {
    return Plant.findAll()
        .then(plants => res.send({ plants }));
});

router.post('/', (req, res, next)=> {
    console.log('the request is: ' + req);
    console.log('the request body is: ' + req.body);
    const { name, light_required } = req.body;
    return Plant.create({ name, light_required })
        .then(plant => res.send(plant));
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