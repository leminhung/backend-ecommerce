const express = require("express");
const router = express();

const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const Product = require("../models/Product");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const { apiEnum } = require("../enum/api.enum");

router
  .get(apiEnum.API_GET_PRODUCTS, advancedResults(Product, ""), getAllProducts)
  .post(apiEnum.API_CREATE_PRODUCT, protect, authorize("admin"), createProduct)
  .get(apiEnum.API_GET_PRODUCT, getProduct)
  .delete(
    apiEnum.API_DELETE_PRODUCT,
    protect,
    authorize("admin"),
    deleteProduct
  )
  .put(apiEnum.API_UPDATE_PRODUCT, protect, authorize("admin"), updateProduct);

module.exports = router;
