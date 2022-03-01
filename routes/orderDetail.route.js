const express = require("express");
const router = express();

const {
  getAllOrderDetails,
  getProducts,
} = require("../controllers/orderDetail.controller");

const { apiEnum } = require("../enum/api.enum");

const productRouter = require("../routes/product.route");

const { protect, authorize } = require("../middleware/auth");

//  Re-route into other resoure routers
router.use(`${apiEnum.API_ORDER_GET_DETAILS}/:orderDetailId`, productRouter);

router.get(
  apiEnum.API_ORDER_GET_DETAILS,
  protect,
  authorize("admin"),
  getAllOrderDetails
);

router.get(apiEnum.API_ORDER_DETAILS_GET_PRODUCTS, getProducts);

module.exports = router;
