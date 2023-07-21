const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./User');

const Orders = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Orders;
