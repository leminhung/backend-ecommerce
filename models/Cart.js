const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total_quantity: {
      type: Number,
      required: true,
      min: [0, "Must be at least 0"],
    },
    total_price: {
      type: Number,
      required: true,
      min: [0, "Must be at least 0"],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Reverse populate with virtuals
CartSchema.virtual("productss", {
  ref: "Product",
  localField: "_id",
  foreignField: "cart",
  justOne: false,
});

// add product to cart
CartSchema.methods.addToCart = async function (options) {
  const { price, products } = options;
  let productsUpdate = [...products];
  // let existingProduct = this.products.findIndex(
  //   (prod) => prod.productId.toString() === productId.toString()
  // );
  // let newQuantity = 1;
  // let productsUpdate = [...this.products];
  // if (existingProduct >= 0) {
  //   newQuantity = this.products[existingProduct].quantity + 1;
  //   productsUpdate[existingProduct].quantity = newQuantity;
  // } else {
  //   productsUpdate.push({
  //     productId,
  //     quantity: newQuantity,
  //   });
  // }
  this.total_quantity = this.total_quantity + 1;
  this.total_price = this.total_price + price;
  this.products = productsUpdate;
  return this.save();
};

CartSchema.methods.deleteItemFromCart = async function (product) {
  const { productId, price } = product;
  const productExisting = await this.products.find(
    (p) => p.productId.toString() === productId.toString()
  );
  const updatedCart = this.products.filter(
    (prod) => prod.productId.toString() !== productId.toString()
  );
  this.products = updatedCart;
  this.total_quantity = this.total_quantity - productExisting.quantity;
  this.total_price = this.total_price - price * productExisting.quantity;
  return this.save();
};
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
