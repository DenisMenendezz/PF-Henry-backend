const { Router } = require("express");
const { createproducts } = require("../controllers/productControllers.js");
const {
  getHandlersProducts,
  getHandlerByIdProduct,
  editProductHandler,
} = require("../handlers/productHandlers.js");
const upload = require('../config/multerConfig.js')

const routerproducts = Router();

routerproducts.get("/", getHandlersProducts);
routerproducts.get("/:idProduct", getHandlerByIdProduct);
routerproducts.post("/create",  upload.array('images', 10), createproducts);
routerproducts.put("/edit/:idProduct", editProductHandler);


module.exports = routerproducts;
