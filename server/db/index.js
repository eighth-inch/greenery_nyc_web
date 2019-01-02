const conn = require('./conn');
const Plant = require('./models/Plant');
const User = require('./models/User');

const sync = async ()=> {
    await conn.sync({ force: true});
}

const seed = ()=> {
    return Promise.all([
        User.create({username: 'admin', password: 'admin', type: 'admin'}),
        Plant.create({name: 'Pathos', light_required: 'low'}),
        Plant.create({name: 'Fig', light_required: 'med'}),
        Plant.create({name: 'Aloe', light_required: 'high'})
    ])
}

module.exports = {
    sync, 
    seed, 
    models: {
        Plant,
        User
    }
}
