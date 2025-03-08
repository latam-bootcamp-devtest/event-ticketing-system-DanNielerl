const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eventicket', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres', // Change to 'mysql', 'sqlite', etc.
  logging: false,
});

module.exports = sequelize;