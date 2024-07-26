const { Router } = require('express');
const routerproducts = require('./productsRouter'); 

const router = Router();
//hola

router.use("/product", routerproducts);

module.exports = router;