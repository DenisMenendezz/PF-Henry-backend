const { Product } = require("../db");

const getProductAdminController = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const editProductAdminController = async (idProduct, updates) => {
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

const deleteProductAdminController = async (idProduct) => {
  try {
    const product = await Product.findByPk(idProduct);
    if (!product) {
      throw new Error("Product not found");
    }

    product.active = !product.active;
    await product.save();

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductAdminController,
  editProductAdminController,
  deleteProductAdminController,
};
