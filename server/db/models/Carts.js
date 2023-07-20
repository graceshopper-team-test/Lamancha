const Sequelize = require("sequelize");
const db = require("../db");

const Carts = db.define("cart", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Carts;
