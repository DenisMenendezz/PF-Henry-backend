const { getProductsController } = require("../controllers/productControllers");

const getHandlersProducts = async (req, res) => {
  try {
    const { size, color, gender, category, brand } = req.query;

    // Construye el objeto de filtros basado en los parámetros de consulta
    const filters = {};

    if (size) {
      // Convierto size en un array
      filters.size = size.split(",");
    }

    if (color) filters.color = color;
    if (gender) filters.gender = gender;
    if (category) filters.category = category;
    if (brand) filters.brand = brand;

    // Llama al controlador con los filtros aplicados
    const products = await getProductsController(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHandlersProducts,
};
