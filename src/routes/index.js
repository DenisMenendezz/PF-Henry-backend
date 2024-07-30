const { Router } = require("express");
const routerproducts = require("./productsRouter");

const router = Router();

router.use("/product", routerproducts);
router.get("/", (req, res) => {
    res.send("Welcome to the API");
  });

module.exports = router;
