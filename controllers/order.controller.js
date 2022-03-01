const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const { codeEnum } = require("../enum/status-code.enum");

// @desc      Get products from cart (use cookie when not loggined user)
// @route     GET /api/v1/order
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  let products = await req.cookies.PRODUCT_CART;
  let productIds = products.map((p) => p.productId);

  Product.find({ _id: { $in: productIds } }, function (err, result) {
    if (err) {
      return next(new ErrorResponse(err.message, codeEnum.NOT_FOUND));
    }
    res.status(codeEnum.SUCCESS).json({ data: result || [] });
  });
});

// @desc      Create order
// @route     POST /api/v1/order/create
// @access    Public
exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);
  res.status(codeEnum.CREATED).json({ data: order });
});

// @desc      Update order
// @route     PUT /api/v1/order/:orderId
// @access    Public
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
  });
  res.status(codeEnum.SUCCESS).json({ data: order });
});

// @desc      Get order
// @route     GET /api/v1/order/:orderId
// @access    Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  res.status(codeEnum.SUCCESS).json({ data: order });
});

// @desc      Get orders
// @route     GET /api/v1/order
// @access    Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(codeEnum.SUCCESS).json({ data: orders });
});

// @desc      Delete order
// @route     DELETE /api/v1/order/:orderId
// @access    Public
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.orderId);
  res.status(codeEnum.SUCCESS).json({ data: {} });
});
