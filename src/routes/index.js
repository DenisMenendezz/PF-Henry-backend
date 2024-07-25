const { Router } = require("express");
const { default: routerproducts } = require("./productsRouter");

const router = Router();


router.use("/product", routerproducts);
module.exports = router;