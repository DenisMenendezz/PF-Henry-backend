const { Router } = require("express");
const { createproducts } = require("../controllers/productControllers.js");
const {
  getHandlersProducts,
  getHandlerByIdProduct,
  editProductHandler,
} = require("../handlers/productHandlers.js");

const routerproducts = Router();

routerproducts.get("/", getHandlersProducts);
routerproducts.get("/:idProduct", getHandlerByIdProduct);

routerproducts.post("/create", createproducts);
routerproducts.put("/edit/:idProduct", editProductHandler);

module.exports = routerproducts;
