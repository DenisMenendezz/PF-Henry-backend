const { Product } = require("../db");

const checkStockMiddleware = async (req, res, next) => {
  const { cartItems } = req.body;

  try {
    for (const item of cartItems) {
      const { productId, size, quantity } = item;

      // Busca el producto en la base de datos por su ID
      const product = await Product.findByPk(productId);

      // Si el producto no se encuentra, lanza un error
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Verifica si el tamaño solicitado tiene suficiente stock
      const availableStock = product.stock[size];
      if (availableStock === undefined) {
        return res
          .status(400)
          .json({
            message: `Size ${size} not available for product ${product.name}`,
          });
      }

      if (availableStock < quantity) {
        return res
          .status(400)
          .json({
            message: `Insufficient stock for product ${product.name}, size ${size}. Available: ${availableStock}, Requested: ${quantity}`,
          });
      }
    }

    // Si todo está bien, continúa con la siguiente función
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error checking stock: ${error.message}` });
  }
};

module.exports = checkStockMiddleware;
