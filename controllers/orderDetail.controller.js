const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const OrderDetail = require("../models/OrderDetail.model");

const { codeEnum } = require("../enum/status-code.enum");
const { msgEnum } = require("../enum/message.enum");

exports.getDetails = asyncHandler(async (req, res, next) => {
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
