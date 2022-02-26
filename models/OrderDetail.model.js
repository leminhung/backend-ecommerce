const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema({
  quantity: {
    type: Number,
    min: [0, "Quantity must be at least 0"],
  },
  price: {
    type: Number,
    min: [0, "Total price must be at least 0"],
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = OrderDetail;
