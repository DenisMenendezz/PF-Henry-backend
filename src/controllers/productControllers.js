const { Product } = require("../db");
const { Op } = require("sequelize");

const getProductsController = async (filters) => {
  try {
    if (filters.size) {
      filters.size = {
        [Op.contains]: filters.size,
      };
    }

    // Busca productos en la base de datos con los filtros aplicados
    const products = await Product.findAll({ where: filters });
    return products;
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
};
