/*
Required Fields:
    Id (UUID String)
    Name/Title (String)
    Type (Enum)
    Created At (Date)
    Updated At (Date)
    Optional Fields:
        Latin Name (String) (potentially, based on client interest)
        Description (String)
        Placement (String)
        Routine Maintenance (String)
        Image url (String)
        Store link (String)
*/
const conn = require('../conn');
const Sequelize = require('sequelize');

const Plant = conn.define('plant', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }, 
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    light_required: {
        type: Sequelize.ENUM('low', 'med', 'high'),
        allowNull: false
    }
});

module.exports = Plant;