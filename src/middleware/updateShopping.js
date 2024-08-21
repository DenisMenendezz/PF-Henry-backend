const { User } = require("../db");

const updateShoppingMiddleware = async (req, res, next) => {
  const { email, cartItems } = req.body;

  try {
    // Encuentra al usuario por el email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Obtén el atributo 'shopping' actual del usuario
    const existingShopping = user.shopping || [];

    // Crea un conjunto de IDs de productos ya existentes en el atributo 'shopping'
    const existingProductIds = new Set(
      existingShopping.map((item) => item.idProduct)
    );

    // Filtra los cartItems para incluir solo aquellos que no están en el atributo 'shopping'
    const newItems = cartItems
      .map((item) => ({
        idProduct: item.productId,
        isReview: false,
      }))
      .filter((item) => {
        // Agrega el producto solo si no está ya en existingProductIds
        const isNewProduct = !existingProductIds.has(item.idProduct);
        if (isNewProduct) {
          // Agrega el ID del producto a existingProductIds para evitar duplicados
          existingProductIds.add(item.idProduct);
          return true;
        }
        return false;
      });

    // Actualiza el atributo 'shopping' con los nuevos items
    user.shopping = [...existingShopping, ...newItems];

    await user.save();

    next();
  } catch (error) {
    console.error("Error updating shopping attribute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateShoppingMiddleware = async (req, res, next) => {
//   const { email, cartItems } = req.body;

//   try {
//     // Encuentra al usuario por el email
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Obtén el atributo 'shopping' actual del usuario
//     const existingShopping = user.shopping || [];

//     // Crea un conjunto de IDs de productos ya existentes en el atributo 'shopping'
//     const existingProductIds = new Set(
//       existingShopping.map((item) => item.idProduct)
//     );

//     // Filtra los cartItems para incluir solo aquellos que no están en el atributo 'shopping'
//     const newItems = cartItems
//       .map((item) => ({
//         idProduct: item.productId,
//         isReview: false,
//       }))
//       .filter((item) => !existingProductIds.has(item.idProduct));

//     // Actualiza el atributo 'shopping' con los nuevos items
//     user.shopping = [...existingShopping, ...newItems];

//     await user.save();

//     next();
//   } catch (error) {
//     console.error("Error updating shopping attribute:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

module.exports = updateShoppingMiddleware;
