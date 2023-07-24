const router = require("express").Router();
const {
  models: { User, Orders },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get a single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Orders,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    await data.destroy();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

