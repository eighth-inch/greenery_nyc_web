/*
    Required Fields:
        Id (UUID String)
        Username (String)
        Password (Hashed String)
        Role (String) (“admin”, “client”)
*/

const conn = require('../conn');
const Sequelize = require('sequelize');

const User = conn.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }, 
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'client')
    }
});

module.exports = User;