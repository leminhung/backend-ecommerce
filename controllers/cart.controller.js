const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const { codeEnum } = require("../enum/status-code.enum");
const { msgEnum } = require("../enum/message.enum");

const {
  raiseQuantityByOne,
  reduceQuantityByOne,
  removeOneProduct,
} = require("../utils/cookieAction");

// @desc      Get products from cart (use cookie when not loggined user)
// @route     GET /api/v1/cart
// @access    Public
exports.getCart = asyncHandler(async (req, res, next) => {
  res.status(codeEnum.SUCCESS).json({ data: req.cookies.PRODUCT_CART || [] });
});

// @desc      Add product to cart (use cookie when not loggined user)
// @route     POST /api/v1/cart/:productId
// @access    Public
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { price } = req.body;

  try {
    let newProducts = {};

    if (!req.cookies.PRODUCT_CART) {
      newProducts = {
        products: [{ productId, quantity: 1 }],
        total: price,
      };
    } else
      newProducts = await raiseQuantityByOne(
        req.cookies.PRODUCT_CART,
        productId,
        price
      );

    res
      .status(codeEnum.SUCCESS)
      .cookie(process.env.PRODUCT_CART, newProducts)
      .json({
        success: true,
        data: newProducts,
      });
  } catch (err) {
    return next(new ErrorResponse(err.message, codeEnum.SERVER_ERROR));
  }
});

// @desc      Delete product to cart (use cookie when not loggined user)
// @route     DELETE /api/v1/cart/:productId
// @access    Public
exports.postCartDeleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { price } = req.body;

  try {
    let updatedCart;
    if (!req.cookies.PRODUCT_CART) {
      return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
    }

    updatedCart = await removeOneProduct(
      req.cookies.PRODUCT_CART,
      productId,
      price
    );

    res
      .status(codeEnum.SUCCESS)
      .cookie(process.env.PRODUCT_CART, updatedCart)
      .json({ data: updatedCart });
  } catch (err) {
    return next(new ErrorResponse(err.message, codeEnum.SERVER_ERROR));
  }
});

// @desc      Delete product to cart (use cookie when not loggined user)
// @route     DELETE /api/v1/cart/:productId
// @access    Public
exports.postCartReduceProductByOne = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { price } = req.body;

  try {
    let updatedCart;
    if (!req.cookies.PRODUCT_CART) {
      return next(new ErrorResponse(msgEnum.NOT_FOUND, codeEnum.NOT_FOUND));
    }

    updatedCart = await reduceQuantityByOne(
      req.cookies.PRODUCT_CART,
      productId,
      price
    );

    res
      .status(codeEnum.SUCCESS)
      .cookie(process.env.PRODUCT_CART, updatedCart)
      .json({ data: updatedCart });
  } catch (err) {
    return next(new ErrorResponse(err.message, codeEnum.SERVER_ERROR));
  }
});
