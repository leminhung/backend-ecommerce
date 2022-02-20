const express = require("express");
const router = express();
const {
  getCart,
  addProductToCart,
  postCartDeleteProduct,
  postCartReduceProductByOne,
} = require("../controllers/cart");
const { apiEnum } = require("../enum/api.enum");

// user add/delete product into/from cart
router
  .get(apiEnum.API_GET_CART, getCart)
  .post(apiEnum.API_ADD_PRODUCT_TO_CART, addProductToCart)
  .post(apiEnum.API_REDUCE_PRODUCT_FROM_CART, postCartReduceProductByOne)
  .delete(apiEnum.API_REMOVE_PRODUCT_FROM_CART, postCartDeleteProduct);

module.exports = router;
