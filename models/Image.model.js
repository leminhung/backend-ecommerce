const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    imagePath: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      require: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
