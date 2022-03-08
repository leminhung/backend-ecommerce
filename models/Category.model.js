const mongoose = require("mongoose");
const slugify = require("slugify");

const opts = { toJSON: { virtuals: true } };

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: String,
  },
  opts
);

// Create category slug from the title
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Category", categorySchema);
