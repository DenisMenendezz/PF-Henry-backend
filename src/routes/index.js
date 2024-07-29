const { Router } = require("express");
const routerproducts = require("./productsRouter");

const router = Router();

router.use("/product", routerproducts);

module.exports = router;
