const { Router } = require("express");
const {
  getReviewHandler,
  postReviewHandler,
} = require("../handlers/reviewHandler");

const routerReview = Router();

routerReview.get("/product/:idProduct", getReviewHandler);
routerReview.post("/product/create/:idProduct", postReviewHandler);

module.exports = routerReview;
