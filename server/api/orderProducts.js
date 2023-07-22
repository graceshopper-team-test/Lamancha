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
    });
    res.json(orderProducts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.findByPk(req.params.id, {
      include: Products,
    });
    res.json(orderProduct);
  } catch (err) {
    next(err);
  }
});

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
    await OrderProducts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updatedOrderProduct = await Products.findByPk(req.params.id);

    res.status(201).json(updatedOrderProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;