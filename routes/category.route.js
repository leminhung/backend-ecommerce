const express = require("express");
const router = express();

const {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getProductsForCategory,
} = require("../controllers/category.controller");

const { apiEnum } = require("../enum/api.enum");
const advancedResults = require("../middleware/advancedResults");

const Category = require("../models/Category.model");

router
  .get(apiEnum.API_GET_PRODUCTS_FOR_CATEGORY, getProductsForCategory)
  .get(apiEnum.API_GET_CATEGORY, getCategory)
  .post(apiEnum.API_CREATE_CATEGORY, createCategory)
  .put(apiEnum.API_UPDATE_CATEGORY, updateCategory)
  .delete(apiEnum.API_DELETE_CATEGORY, deleteCategory);

router.get(
  apiEnum.API_GET_CATEGORIES,
  advancedResults(Category, ""),
  getAllCategories
);
module.exports = router;
