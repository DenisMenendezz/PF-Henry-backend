const { Product } = require("../db");
const { Op } = require("sequelize");

const getProductsController = async (filters, pagination) => {
  try {
    if (filters.size) {
      filters.size = {
        [Op.contains]: filters.size,
      };
    }

    // Busca productos en la base de datos con los filtros aplicados y paginación
    const products = await Product.findAll({
      where: filters,
      limit: pagination.limit,
      offset: pagination.offset,
    });
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductByNameController = async (name, filters, pagination) => {
  try {
    if (filters.size) {
      filters.size = {
        [Op.contains]: filters.size,
      };
    }

    const productsByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        ...filters,
      },
      limit: pagination.limit,
      offset: pagination.offset,
    });
    return productsByName;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductByIdController = async (idProduct) => {
  try {
    const product = await Product.findByPk(idProduct);
    if (!product) {
      throw new Error("The product doesn`t exist");
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createproducts = async (req, res) => {
  const {
    name,
    description,
    color,
    brand,
    price,
    images,
    stock,
    gender,
    category,
    size,
  } = req.body;

  try {
    const newproducts = await Product.create({
      name,
      description,
      color,
      brand,
      price,
      images,
      stock,
      gender,
      category,
      size,
    });

    res.json(newproducts);
    console.log(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductsController,
  createproducts,
  getProductByIdController,
  getProductByNameController,
};
