const router = require("express").Router();
const {
  models: { Products, OrderProducts },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orderProducts = await OrderProducts.findAll({
      // explicitly select only the id and username fields - even though
      // orderProduct' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["orderId", "productId", "quantity"],
      include: Products,
    });
    res.json(orderProducts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderProducts = await OrderProducts.findAll({
      where: { orderId: req.params.id },
      include: Products,
    });
    res.json(orderProducts);
  } catch (err) {
    next(err);
  }
});

// the post right now only works on orderId existed. do not work on new orderId
router.post("/", async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.create(req.body);
    res.json(orderProduct);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await OrderProducts.findByPk(id);
    await data.destroy();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// update orderProduct with id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Check if quantity is provided
    if (!quantity) {
      return res.status(400).json({ error: "quantity is required" });
    }

    // Find the existing orderProduct by its ID
    const existingOrderProduct = await OrderProducts.findByPk(id);

    // Check if the orderProduct exists
    if (!existingOrderProduct) {
      return res.status(404).json({ error: "OrderProduct not found" });
    }

    // Update the orderProduct with the new quantity
    await existingOrderProduct.update({ quantity });

    res.status(200).json(existingOrderProduct);
  } catch (err) {
    next(err);
  }
});



module.exports = router;