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
    const newReview = await postReviewController(idProduct, userId, comment);

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviewHandler,
  postReviewHandler,
};
