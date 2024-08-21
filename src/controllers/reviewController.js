const { Product, Review, User } = require("../db");

const getReviewController = async (idProduct) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: idProduct },
      include: {
        model: User,
        attributes: ["email"],
      },
    });

    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postReviewController = async (idProduct, userId, comment) => {
  try {
    const newReview = await Review.create({
      productId: idProduct,
      userId,
      comment,
    });

    return newReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReviewController = async (idReview, comment) => {
  try {
    const review = await Review.findByPk(idReview);

    if (!review) {
      return null;
    }

    review.comment = comment;
    await review.save();

    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getReviewController,
  postReviewController,
  updateReviewController,
};
