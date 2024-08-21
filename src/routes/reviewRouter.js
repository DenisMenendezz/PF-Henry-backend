const { Router } = require("express");
const {
  getReviewHandler,
  postReviewHandler,
  updateReviewHandler,
} = require("../handlers/reviewHandler");

const routerReview = Router();

routerReview.get("/product/:idProduct", getReviewHandler);
routerReview.post("/product/create/:idProduct", postReviewHandler);
routerReview.put("/product/edit/:idReview", updateReviewHandler);

module.exports = routerReview;
