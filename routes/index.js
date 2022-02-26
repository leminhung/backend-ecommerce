const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const cartRouter = require("./cart.route");
const orderRouter = require("./order.route");
const orderDetailRouter = require("./orderDetail.route");

const routers = [
  authRouter,
  productRouter,
  cartRouter,
  orderRouter,
  orderDetailRouter,
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use("/api/v1", router);
  });
};
