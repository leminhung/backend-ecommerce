const express = require("express");
const router = express();

const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  productPhotoUpload,
} = require("../controllers/product.controller");

const Product = require("../models/Product.model");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const { apiEnum } = require("../enum/api.enum");

router.get(apiEnum.API_GET_PRODUCT, getProduct);

// protect all routes below
router.use(protect, authorize("admin"));

router.get(
  apiEnum.API_GET_PRODUCTS,
  advancedResults(Product, { path: "images", select: "imagePath" }),
  getAllProducts
);

router.post(apiEnum.API_CREATE_PRODUCT, createProduct);

router.delete(apiEnum.API_DELETE_PRODUCT, deleteProduct);

router.put(apiEnum.API_UPDATE_PRODUCT, updateProduct);

router.put(apiEnum.API_UPLOAD_PRODUCT_PHOTO, productPhotoUpload);

module.exports = router;
