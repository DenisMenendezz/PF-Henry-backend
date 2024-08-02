const { Router } = require("express");
const routerproducts = require("./productsRouter");
const routeruser = require("./userRouter");

const router = Router();

router.use("/product", routerproducts);
router.use("/user", routeruser);
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
