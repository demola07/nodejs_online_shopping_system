const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Higherways07', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
