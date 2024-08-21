const { Router } = require("express");
const { createproducts } = require("../controllers/productControllers.js");
const { stripePost } = require("../controllers/stripeController.js");
const {
  getHandlersProducts,
  getHandlerByIdProduct,
  editProductHandler,
} = require("../handlers/productHandlers.js");
const upload = require("../config/multerConfig.js");
const checkStockMiddleware = require("../middleware/CheckStock.js");
const updateStockMiddleware = require("../middleware/updateStock.js");
const updateShoppingMiddleware = require("../middleware/updateShopping.js");

const routerproducts = Router();

routerproducts.get("/", getHandlersProducts);
routerproducts.get("/:idProduct", getHandlerByIdProduct);
routerproducts.post("/create", createproducts);
routerproducts.put("/edit/:idProduct", editProductHandler);
routerproducts.post("/checkout", stripePost, updateShoppingMiddleware);

module.exports = routerproducts;
