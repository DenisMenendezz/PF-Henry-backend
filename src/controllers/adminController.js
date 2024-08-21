const { Product } = require("../db");
const { User } = require("../db");

const getProductAdminController = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductByNameAdminController = async (name) => {
  try {
    const productByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return productByName;
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

    // Verifica si hay una actualización de stock
    if (updates.stock) {
      // Combina el stock existente con el nuevo stock
      const updatedStock = { ...product.stock, ...updates.stock };
      updates.stock = updatedStock;
    }

    // Verifica si hay una actualización de size
    if (updates.size) {
      // Combina los sizes existentes con los nuevos sizes sin duplicar
      const updatedSize = Array.from(
        new Set([...product.size, ...updates.size])
      );
      updates.size = updatedSize;
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

const getUserAdminController = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const editUserAdminController = async (idUser, updates) => {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error("User not found");
    }

    await user.update(updates);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserAdminController = async (idUser) => {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error("User not found");
    }

    user.active = !user.active;
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductAdminController,
  editProductAdminController,
  deleteProductAdminController,
  getProductByNameAdminController,
  getUserAdminController,
  editUserAdminController,
  deleteUserAdminController,
};
