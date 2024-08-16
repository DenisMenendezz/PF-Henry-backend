const { Router } = require("express");
const routerproducts = require("./productsRouter");
const routeruser = require("./userRouter");
const routerAdmin = require("./adminRouter");
const routerBorrar = require("./borrarRouter");

const router = Router();

router.use("/borrar", routerBorrar);
router.use("/product", routerproducts);
router.use("/user", routeruser);
router.use("/admin", routerAdmin);
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
