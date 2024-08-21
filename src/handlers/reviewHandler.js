const { User } = require("../db");
const {
  getReviewController,
  postReviewController,
} = require("../controllers/reviewController");

const getReviewHandler = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const reviews = await getReviewController(idProduct);

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postReviewHandler = async (req, res) => {
  const { idProduct } = req.params;
  const { userId, comment } = req.body;

  try {
    // Buscar el usuario por userId
    const user = await User.findOne({ where: { uid: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si el atributo shopping contiene el producto con isReview: false
    const userShopping = user.shopping || [];
    const productInShopping = userShopping.find(
      (item) => item.idProduct === idProduct && item.isReview === false
    );

    if (!productInShopping) {
      return res.status(400).json({
        message:
          "The user must purchase the product in order to provide a review.",
      });
    }

    // Crear la reseña si la validación es exitosa
    const newReview = await postReviewController(idProduct, userId, comment);

    //  Actualizar el atributo shopping para marcar el producto como revisado
    await User.update(
      {
        shopping: userShopping.map((item) =>
          item.idProduct === idProduct ? { ...item, isReview: true } : item
        ),
      },
      { where: { uid: userId } }
    );

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const postReviewHandler = async (req, res) => {
//   const { idProduct } = req.params;
//   const { userId, comment } = req.body;

//   try {
//     const newReview = await postReviewController(idProduct, userId, comment);

//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getReviewHandler,
  postReviewHandler,
};
