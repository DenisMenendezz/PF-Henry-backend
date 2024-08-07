const {
  getProductsController,
  getProductByIdController,
  getProductByNameController,
  editProductController,
} = require("../controllers/productControllers");
const { Op } = require("sequelize");

const getHandlersProducts = async (req, res) => {
  try {
    const {
      name,
      size,
      color,
      gender,
      category,
      brand,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    // Paginacion
    const pagination = {
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    };

    // Validación de parametros
    const filters = buildFilters({
      size,
      color,
      gender,
      category,
      brand,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    });

    if (name) {
      // Busca productos por nombre aplicando filtros y paginacion
      const productsByName = await getProductByNameController(
        name,
        filters,
        pagination
      );
      return res.json(productsByName);
    }

    // Busca productos con los filtros y la paginacion
    const products = await getProductsController(filters, pagination);
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHandlerByIdProduct = async (req, res) => {
  const { idProduct } = req.params;

  try {
    const productId = await getProductByIdController(idProduct);

    res.json(productId);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const editProductHandler = async (req, res) => {
  const { idProduct } = req.params;
  const updates = req.body;

  try {
    const editedProduct = await editProductController(idProduct, updates);
    res.json({
      message: "Product updated successfully",
      product: editedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const buildFilters = ({
  size,
  color,
  gender,
  category,
  brand,
  minPrice,
  maxPrice,
}) => {
  const filters = {};

  if (size) {
    // Convierto size en un array
    filters.size = size.split(",");
  }

  if (color) filters.color = color;
  if (gender) filters.gender = gender;
  if (category) filters.category = category;
  if (brand) filters.brand = brand;

  // Filtro de precio mínimo y máximo
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) {
      filters.price[Op.gte] = minPrice;
    }
    if (maxPrice) {
      filters.price[Op.lte] = maxPrice;
    }
  }

  return filters;
};

module.exports = {
  getHandlersProducts,
  getHandlerByIdProduct,
  editProductHandler,
};
