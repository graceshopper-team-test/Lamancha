const router = require("express").Router();
const {
  models: { User, Orders },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      // explicitly select only the id and username fields - even though
      // orders' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "userId", "completed"],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Orders.findByPk(req.params.id, {
      include: User,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = await Orders.create(req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Orders.findByPk(id);
    await data.destroy();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
