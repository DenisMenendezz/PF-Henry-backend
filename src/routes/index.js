const { Router } = require('express');
const productsRouter = require('./productsRouter');


const router = Router();

// Definición de tus rutas aquí //

router.use("/product", productsRouter)

module.exports = router;
