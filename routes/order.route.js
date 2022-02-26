const express = require("express");
const router = express();
const {
  getProducts,
  createOrder,
  updateOrder,
  getOrder,
  deleteOrder,
  getOrders,
} = require("../controllers/order.controller");
const { apiEnum } = require("../enum/api.enum");
const { protect, authorize } = require("../middleware/auth");

router
  .get(apiEnum.API_ORDER_GET_PRODUCTS, getProducts)
  .get(apiEnum.API_GET_ORDERS, protect, authorize("admin"), getOrders)
  .get(apiEnum.API_GET_ORDER, protect, authorize("admin"), getOrder)
  .delete(apiEnum.API_DELETE_ORDER, protect, authorize("admin"), deleteOrder)
  .post(apiEnum.API_CREATE_ORDER, createOrder)
  .put(apiEnum.API_UPDATE_ORDER, protect, authorize("admin"), updateOrder);
module.exports = router;
