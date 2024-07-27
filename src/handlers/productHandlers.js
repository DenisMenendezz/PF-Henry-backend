const {
  getProductsController,
  getProductByIdController,
  getProductByNameController,
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
    res.status(500).json({ message: error.message });
  }
};

// const getHandlersProducts = async (req, res) => {
//   try {
//     const {
//       name,
//       size,
//       color,
//       gender,
//       category,
//       brand,
//       minPrice,
//       maxPrice,
//       page = 1,
//       limit = 12,
//     } = req.query;

//     if (name) {
//       const queryName = await getProductByNameController(name);
//       res.json(queryName);
//     }

//     // Validación de parámetros
//     const filters = buildFilters({
//       size,
//       color,
//       gender,
//       category,
//       brand,
//       minPrice: Number(minPrice),
//       maxPrice: Number(maxPrice),
//     });

//     // Paginación
//     const pageNumber = Math.max(1, parseInt(page));
//     const limitNumber = Math.max(1, parseInt(limit));
//     const offset = (pageNumber - 1) * limitNumber;

//     // Llama al controlador con los filtros aplicados
//     const products = await getProductsController(filters, {
//       limit: limitNumber,
//       offset,
//     });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getHandlerByIdProduct = async (req, res) => {
  const { idProduct } = req.params;

  try {
    const productId = await getProductByIdController(idProduct);

    res.json(productId);
  } catch (error) {
    res.json({ message: error.message });
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
};
