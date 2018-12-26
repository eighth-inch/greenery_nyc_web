const conn = require('./conn');
const Plant = require('./models/Plant');
const User = require('./models/User');

const sync = ()=> {
    conn.sync({ force: true});
}

const seed = ()=> {
    User.create({username: 'admin', password: 'admin', type: 'admin'})
}

module.exports = {
    sync, 
    seed, 
    models: {
        Plant,
        User
    }
}
