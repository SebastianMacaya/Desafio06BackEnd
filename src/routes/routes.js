const { Router } = require("express");
const router = Router();
const Products = require("../../products");
//Routes
router.post("/api/productos", Products.create);
router.put("/api/productos/:id", Products.updateById);
router.get("/api/productos", Products.getAll);
router.get("/api/productos/:id", Products.findById);
router.delete("/api/productos/:id", Products.deleteById);
module.exports = router;
