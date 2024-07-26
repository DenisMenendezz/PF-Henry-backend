const Sequelize = require('sequelize');

const sequelize = new Sequelize('championGear', 'postgres', 'Qwerty1997', {
   host: 'localhost',
   dialect: 'postgres'
});

module.exports = { sequelize };
