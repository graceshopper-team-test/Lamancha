"use strict";

const {
  db,
  models: { User, Products, Orders, OrderProducts },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const productsData = [
  {
    id: 1,
    name: "Smartphone",
    price: 599.99,
    imageUrl: "https://example.com/smartphone.jpg",
    details: "High-end smartphone with advanced features.",
    stock: 50,
  },
  {
    id: 2,
    name: "Laptop",
    price: 999.99,
    imageUrl: "https://example.com/laptop.jpg",
    details: "Powerful laptop for work and entertainment.",
    stock: 30,
  },
  {
    id: 3,
    name: "Headphones",
    price: 129.99,
    imageUrl: "https://example.com/headphones.jpg",
    details: "Wireless headphones with noise-cancelling.",
    stock: 100,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 199.99,
    imageUrl: "https://example.com/smartwatch.jpg",
    details: "Fitness tracker and smartwatch in one.",
    stock: 20,
  },
  {
    id: 5,
    name: "Tablet",
    price: 349.99,
    imageUrl: "https://example.com/tablet.jpg",
    details: "Portable tablet for productivity and entertainment.",
    stock: 40,
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const products = await Promise.all(
    productsData.map((product) => Products.create(product))
  );
  const makeOrders = await Promise.all([
    Orders.create({
      userId: 2,
      completed: false,
    }),
    Orders.create({
      userId: 1,
      completed: false,
    }),
  ]);

  const orderProducts = await Promise.all([
    OrderProducts.create({
      orderId: 1,
      productId: 3,
      quantity: 2,
    }),
    OrderProducts.create({
      orderId: 1,
      productId: 1,
      quantity: 2,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${makeOrders.length} makeOrders`);
  console.log(`seeded ${orderProducts.length} orderProducts`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products,
    makeOrders,
    orderProducts,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
