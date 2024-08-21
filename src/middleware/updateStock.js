const { Product } = require("../db");

const updateStockMiddleware = async (req, res, next) => {
  const { cartItems } = req.body;

  try {
    for (const item of cartItems) {
      const { productId, size, quantity } = item;

      const product = await Product.findByPk(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Verifica si el tamaño solicitado existe en el stock
      const availableStock = product.stock[size];
      if (availableStock === undefined) {
        return res.status(400).json({
          message: `Size ${size} not available for product ${product.name}`,
        });
      }

      // Resto la cantidad comprada del stock
      const newStock = availableStock - quantity;

      if (newStock < 0) {
        return res.status(400).json({
          message: `Insufficient stock for product ${product.name}, size ${size}`,
        });
      }

      // Actualiza el stock en el producto
      product.stock[size] = newStock;

      await product.save();
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating stock: ${error.message}` });
  }
};

module.exports = updateStockMiddleware;
