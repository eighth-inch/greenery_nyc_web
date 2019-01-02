const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/greenery_nyc', { logging: false });

module.exports = conn;