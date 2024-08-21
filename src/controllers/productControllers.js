const { Product } = require("../db");
const { Op } = require("sequelize");
const cloudinary = require('../config/cloudinaryConfig')
const stream = require('stream')

const getProductsController = async (filters, pagination) => {
  try {
    if (filters.size && Array.isArray(filters.size)) {
      filters.size = {
        [Op.or]: filters.size.map((size) => ({
          [Op.contains]: [size],
        })),
      };
    }

    // if (filters.size) {
    //   filters.size = {
    //     [Op.contains]: filters.size,
    //   };
    // }

    // Busca productos en la base de datos con los filtros aplicados y paginación
    const products = await Product.findAll({
      where: {
        ...filters,
        active: true,
      },
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
    if (filters.size && Array.isArray(filters.size)) {
      filters.size = {
        [Op.or]: filters.size.map((size) => ({
          [Op.contains]: [size],
        })),
      };
    }

    // if (filters.size) {
    //   filters.size = {
    //     [Op.contains]: filters.size,
    //   };
    // }

    const productsByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        ...filters,
        active: true,
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

const editProductController = async (idProduct, updates) => {
  try {
    const product = await Product.findByPk(idProduct);
    if (!product) {
      throw new Error("Product not found");
    }

    await product.update(updates);

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
    images,  // Ahora recibes las URLs de las imágenes directamente
    stock,
    gender,
    category,
    size,
  } = req.body;
try{
    const newProduct = await Product.create({
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

    res.json({
      message: 'Product created successfully',
      product: newProduct,
      imageUrls: images
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createproducts };

module.exports = {
  getProductsController,
  createproducts,
  getProductByIdController,
  getProductByNameController,
  editProductController,
};
