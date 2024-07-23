const { Router } = require('express');
const router = Router();

// Definición de tus rutas aquí
router.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

module.exports = router;
