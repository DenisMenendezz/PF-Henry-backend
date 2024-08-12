const {
  getProductAdminController,
  editProductAdminController,
  deleteProductAdminController,
} = require("../controllers/adminController");

const getProductAdminHandler = async (req, res) => {
  try {
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

module.exports = {
  getProductAdminHandler,
  editProductAdminHandler,
  deleteProductAdminHandler,
};
