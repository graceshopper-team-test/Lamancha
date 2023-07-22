const Sequelize = require("sequelize");
const db = require("../db");
const Orders = require("./Orders");
const Products = require("./Products");

const OrderProducts = db.define("orderProducts", {
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Orders,
      key: "id",
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = OrderProducts;