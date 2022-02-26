const express = require("express");
const router = express();
const { getDetails } = require("../controllers/orderDetail.controller");
const { apiEnum } = require("../enum/api.enum");
const { protect, authorize } = require("../middleware/auth");

router.get(apiEnum.API_ORDER_GET_DETAILS, getDetails);
module.exports = router;
