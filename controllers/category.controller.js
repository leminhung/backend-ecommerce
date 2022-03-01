const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

const asyncHandler = require("../middleware/async");

const ErrorResponse = require("../utils/ErrorResponse");

const { codeEnum } = require("../enum/status-code.enum");
const { msgEnum } = require("../enum/message.enum");

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private(Admin)
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  res.status(codeEnum.SUCCESS).json(res.advancedResults);
});

// @desc      Get category
// @route     GET /api/v1/categories/:categoryId
// @access    Private(Admin)
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById({ _id: req.params.categoryId });

  if (!category) {
    return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
  }
  res.status(codeEnum.SUCCESS).json({ data: category });
});

// @desc      Add category
// @route     POST /api/v1/categories
// @access    Private(Admin)
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const category = await Category.create({ title });

  res.status(codeEnum.CREATED).json({ data: category });
});

// @desc      Delete category
// @route     DELETE /api/v1/categories/:categoryId
// @access    Private(Admin)
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
  }

  await Category.findByIdAndDelete(req.params.categoryId);

  res.status(201).json({ data: category });
});

// @desc      Update category
// @route     PUT /api/v1/category/:categoryId
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
  }

  category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(codeEnum.SUCCESS).json({
    success: true,
    data: category,
  });
});

// @desc      Get products for 1 category
// @route     GET /api/v1/categories/:categoryId/products
// @access    Public
exports.getProductsForCategory = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ category: req.params.categoryId });
  res.status(codeEnum.SUCCESS).json({ data: products });
});
