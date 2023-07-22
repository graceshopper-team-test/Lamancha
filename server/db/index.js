//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Products = require("./models/Products");
const Orders = require("./models/Orders");
const OrderProducts = require("./models/OrderProducts");

//associations could go here!
User.hasMany(Orders);
Orders.belongsTo(User);

Orders.belongsToMany(Products, { through: OrderProducts });
Products.belongsToMany(Orders, { through: OrderProducts });

module.exports = {
  db,
  models: {
    User,
    Products,
    Orders,
    OrderProducts,
  },
};
