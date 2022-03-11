const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      min: [1, "Content must be at least 1 character"],
      required: true,
    },
    reaction: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// use in case delete category
// commentSchema.pre("deleteMany", async function (next) {
//   await this.model("Image").deleteMany({ product: this._id });
//   next();
// });

module.exports = mongoose.model("Comment", commentSchema);
