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
  console.log('files', req.files);
  console.log('body', req.body);

  const { name, description, color, brand, price, stock, gender, category } = req.body;
  let { size } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      throw new Error('No files uploaded');
    }

    // Convertir size a un array si no lo es
    size = Array.isArray(size) ? size : size.replace(/[\[\]\n]/g, '').split(',').map(s => s.trim());

    // Subir imágenes a Cloudinary
    const uploadedImages = await Promise.all(req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url);
        });

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    }));

    const newProduct = await Product.create({
      name,
      description,
      color,
      brand,
      price,
      images: uploadedImages,
      stock,
      gender,
      category,
      size,
    });

    res.json({
      message: 'Product created successfully',
      product: newProduct,
      imageUrls: uploadedImages
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
