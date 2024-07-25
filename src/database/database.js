const Sequelize = require('sequelize');

const sequelize = new Sequelize('championsproduct', 'postgres', 'Qwerty1997', {
   host: 'localhost',
   dialect: 'postgres'
});

module.exports = { sequelize };
