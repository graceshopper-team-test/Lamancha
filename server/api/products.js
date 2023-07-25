const router = require("express").Router();
const {
  models: { Products },
} = require("../db");
module.exports = router;

// get all product
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// get single product with id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// add single product, send new product back
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// delete product with id
router.delete("/admin/:id", async (req, res, next) => {
  try {
    const deleteProduct = await Products.findByPk(req.params.id);
    await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteProduct);
  } catch (err) {
    next(err);
  }
});

// update product with id
router.put("/:id", async (req, res, next) => {
  try {
    await Products.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updatedProduct = await Products.findByPk(req.params.id);

    res.status(201).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
