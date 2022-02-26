const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be at least 0"],
  },
  code: { type: String, required: true },
  color: { type: String, required: true },
  status: { type: String, required: true },
  size: {
    type: String,
    enum: ["XL", "L", "M", "S", "XXL", "3XL"],
    required: true,
  },
  slug: String,
  description: String,
  discount: { type: Number, min: [0, "Discount must be at least 0"] },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
});

// Create product slug from the title
productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);