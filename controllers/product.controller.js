const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all product
// @route     GET /api/v1/products
// @access    Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get product
// @route     GET /api/v1/products/:productId
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById({ _id: req.params.productId });
  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with id of ${req.params.productId}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: product });
});

// @desc      Add product
// @route     POST /api/v1/products
// @access    Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, price } = req.body;

  const product = await Product.create({ name, price });

  res.status(201).json({ success: true, data: product });
});

// @desc      Delete product
// @route     DELETE /api/v1/products/:productId
// @access    Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with id of ${req.params.productId}`,
        404
      )
    );
  }

  await Product.findByIdAndDelete(req.params.productId);

  res.status(201).json({ success: true, data: product });
});

// @desc      Update product
// @route     PUT /api/v1/product/:productId
// @access    Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);
  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with id of ${req.params.productId}`,
        404
      )
    );
  }

  product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});
