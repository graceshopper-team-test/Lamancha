const Sequelize = require("sequelize");
const db = require("../db");

const Products = db.define("products", {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true, // Make sure auto-increment is set
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "image Link Here",
  },
  details: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Products;
