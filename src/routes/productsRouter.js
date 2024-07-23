const { Router } = require("express");
const { postProduct, getProducts, deleteProduct } = require("../handlers/productHandlers");



const productsRouter = Router();

productsRouter.post("/", postProduct);

productsRouter.get("/", getProducts);

productsRouter.delete("/:idProduct", deleteProduct);



module.exports = productsRouter;