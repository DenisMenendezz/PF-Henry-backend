const { Router } = require('express');

const routerproducts = require('./productsRouter'); 

const router = Router();


router.use("/product", routerproducts);


const router = Router();

// Aquí van tus rutas
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Exportar el router

module.exports = router;