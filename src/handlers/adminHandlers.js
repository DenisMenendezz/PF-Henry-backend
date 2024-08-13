const {
  getProductAdminController,
  editProductAdminController,
  deleteProductAdminController,
  getProductByNameAdminController,
  getUserAdminController,
  editUserAdminController,
  deleteUserAdminController,
} = require("../controllers/adminController");

const getProductAdminHandler = async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const productsByName = await getProductByNameAdminController(name);
      return res.json(productsByName);
    }

    const products = await getProductAdminController();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const editProductAdminHandler = async (req, res) => {
  const { idProduct } = req.params;
  const updates = req.body;

  try {
    const editedProduct = await editProductAdminController(idProduct, updates);
    res.json({
      message: "Product updated successfully",
      product: editedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteProductAdminHandler = async (req, res) => {
  const { idProduct } = req.params;

  try {
    const product = await deleteProductAdminController(idProduct);
    res.json({
      message: "Product active status toggled successfully",
      product: product,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUserAdminHandler = async (req, res) => {
  try {
    const users = await getUserAdminController();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const editUserAdminHandler = async (req, res) => {
  const { idUser } = req.params;
  const updates = req.body;

  try {
    const editedUser = await editUserAdminController(idUser, updates);
    res.json({
      message: "User updated successfully",
      User: editedUser,
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteUserAdminHandler = async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await deleteUserAdminController(idUser);
    res.json({
      message: "User active status toggled successfully",
      user: user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getProductAdminHandler,
  editProductAdminHandler,
  deleteProductAdminHandler,
  getUserAdminHandler,
  editUserAdminHandler,
  deleteUserAdminHandler,
};
