const util = require('util');
const router = require('express').Router();
const { Plant } = require('../db').models;
const Sequelize = require('sequelize');

router.get('/', (req, res, next) => {
    const { light_required } = req.query;
    // console.log('light required is: ', light_required);

    if (!light_required) {
        return Plant.findAll()
            .then(plants => res.send({ plants }))
            .catch(next);
    } else {
        const params = light_required.split(",");
        return Plant.findAll({ 
            where: { 
                light_required: { [Sequelize.Op.or]: params } 
            }
        })
        .then(plants => res.send({ plants }))
        .catch(next);    
    }
});

router.post('/', (req, res, next)=> {
    // console.log('the request is: ' + util.inspect(req));
    // console.log('the request body is: ' + util.inspect(req.body));
    const { plant } = req.body;
    const { name, light_required } = plant;
    return Plant.create({ name, light_required })
        .then(_plant => res.send(_plant))
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    return Plant.findOne({ where: { id } })
        .then(_plant => {
            console.log('plant is : ' + _plant)
            res.send({ plant: _plant })
        })
        .next();

        //Needs not found handling
});

router.delete('/:id', (req, res, next)=> {
    const { id } = req.params;

    return Plant.destroy({ where: { id } })
        .then(res.sendStatus(200));
})

module.exports = router;