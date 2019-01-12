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
    return Plant.findByPk(id)
        .then(_plant => {
            if (_plant) {
                res.send({ plant: _plant })
            } 
            else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            res.sendStatus(404);
            next(err);
        })

        //Needs not found handling
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { plant } = req.body;
    const { name, light_required } = plant;
    let update = {
        name: '',
        light_required: ''
    };

    return Plant.findByPk(id)
        .then(_plant => {
            console.log('plant name is: ', _plant.name);
            update.light_required = light_required ? light_required : _plant.light_required
            update.name = name ? name : _plant.name;

            Plant.update(update, { where: { id } })
                .then(response => {
                    if (response[0] == 1) {
                        return Plant.findByPk(id)
                            .then(plant => res.send(plant))
                    }
                    else {
                        res.sendStatus(400)
                    }
                })
                .catch(err => {
                    res.sendStatus(400);
                    next(err)
                })
        })
    
        .catch(err => {
            res.sendStatus(404);
            next(err);
        })
})

router.delete('/:id', (req, res, next)=> {
    const { id } = req.params;

    return Plant.destroy({ where: { id } })
        .then(res.sendStatus(200));
})

module.exports = router;