// import { Router } from "express";
const { Router } = require("express");
const {getproducts, createproducts } = require('../controllers/productControllers.js');

// const router = Router()
const routerproducts = Router();

routerproducts.get('/', getproducts);

routerproducts.post('/create', createproducts);
// routerproducts.delete(':id');
// routerproducts.get(':id');
// routerproducts.get(':id');

// export default routerproducts;
module.exports = routerproducts;


