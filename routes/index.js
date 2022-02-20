const authRouter = require("./auth");
const productRouter = require("./product");
const cartRouter = require("./cart");
const routers = [authRouter, productRouter, cartRouter];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use("/api/v1", router);
  });
};
