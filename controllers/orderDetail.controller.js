const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const OrderDetail = require("../models/OrderDetail.model");
const Product = require("../models/Product.model");

const { codeEnum } = require("../enum/status-code.enum");
const { msgEnum } = require("../enum/message.enum");

// @desc      Get order details
// @route     GET /api/v1/order-details
// @access    Private(Admin)
exports.getAllOrderDetails = asyncHandler(async (req, res, next) => {
  const detailProds = await OrderDetail.find().populate({
    path: "product order",
  });

  if (!detailProds) {
    return next(
      new ErrorResponse(msgEnum.PRODUCT_NOT_FOUND, codeEnum.NOT_FOUND)
    );
  }

  res.status(codeEnum.SUCCESS).json({ data: detailProds });
});

// @desc      Get products from cart (use cookie when not loggined user)
// @route     GET /api/v1/order-details/products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  let products = await req.cookies.PRODUCT_CART.products;
  let productIds = products.map((p) => p.productId);

  products = await Product.find({ _id: { $in: productIds } });

  if (!products) {
    return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
  }

  res
    .status(codeEnum.SUCCESS)
    .json({ data: products || [], total: req.cookies.PRODUCT_CART.total });
});
