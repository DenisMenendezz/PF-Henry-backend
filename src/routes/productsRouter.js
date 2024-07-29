const { Router } = require("express");
const { createproducts } = require("../controllers/productControllers.js");
const {
  getHandlersProducts,
  getHandlerByIdProduct,
} = require("../handlers/productHandlers.js");

const routerproducts = Router();

routerproducts.get("/", getHandlersProducts);
routerproducts.get("/:idProduct", getHandlerByIdProduct);

routerproducts.post("/create", createproducts);

module.exports = routerproducts;
