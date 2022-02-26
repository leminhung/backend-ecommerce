const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const {
  raiseQuantityByOne,
  reduceQuantityByOne,
  removeOneProduct,
} = require("../utils/cookieAction");

// @desc      Get products from cart (use cookie when not loggined user)
// @route     GET /api/v1/cart
// @access    Public
exports.getCart = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.cookies.PRODUCT_CART || [] });
});

// @desc      Add product to cart (use cookie when not loggined user)
// @route     POST /api/v1/cart/:productId
// @access    Public
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  console.log(req.cookies.PRODUCT_CART);
  try {
    let newProducts = [];
    if (!req.cookies.PRODUCT_CART) {
      newProducts.push({ productId, quantity: 1 });
    } else
      newProducts = await raiseQuantityByOne(
        req.cookies.PRODUCT_CART,
        productId
      );
    res.status(200).cookie(process.env.PRODUCT_CART, newProducts).json({
      success: true,
      data: newProducts,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
});

// @desc      Delete product to cart (use cookie when not loggined user)
// @route     DELETE /api/v1/cart/:productId
// @access    Public
exports.postCartDeleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  try {
    let updatedCart;
    if (!req.cookies.PRODUCT_CART) {
      return next(new ErrorResponse("Not found products", 404));
    }
    updatedCart = await removeOneProduct(req.cookies.PRODUCT_CART, productId);
    res
      .status(200)
      .cookie(process.env.PRODUCT_CART, updatedCart)
      .json({ success: true, data: updatedCart });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
});

// @desc      Delete product to cart (use cookie when not loggined user)
// @route     DELETE /api/v1/cart/:productId
// @access    Public
exports.postCartReduceProductByOne = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  try {
    let updatedCart;
    if (!req.cookies.PRODUCT_CART) {
      return next(new ErrorResponse("Not found products", 404));
    }
    updatedCart = await reduceQuantityByOne(
      req.cookies.PRODUCT_CART,
      productId
    );
    res
      .status(200)
      .cookie(process.env.PRODUCT_CART, updatedCart)
      .json({ success: true, data: updatedCart });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
});
