const { Router } = require("express");
const { createproducts } = require("../controllers/productControllers.js");
const {stripePost} =require('./routerstripe.js')
const {
  getHandlersProducts,
  getHandlerByIdProduct,
  editProductHandler,
} = require("../handlers/productHandlers.js");
const upload = require('../config/multerConfig.js')


const routerproducts = Router();

routerproducts.get("/", getHandlersProducts);
routerproducts.get("/:idProduct", getHandlerByIdProduct);
routerproducts.post("/create", createproducts);
routerproducts.put("/edit/:idProduct", editProductHandler);
routerproducts.post('/checkout', stripePost);



module.exports = routerproducts;
