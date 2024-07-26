// import { Router } from "express";
const { Router } = require("express");
const { createproducts } = require('../controllers/productControllers.js');
const { getHandlersProducts } = require("../handlers/productHandlers.js");


// const router = Router()
const routerproducts = Router();

routerproducts.get('/', getHandlersProducts);

routerproducts.post('/create', createproducts);
// routerproducts.delete(':id');
// routerproducts.get(':id');
// routerproducts.get(':id');

// export default routerproducts;
module.exports = routerproducts;


