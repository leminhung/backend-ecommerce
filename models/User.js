const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    email: {
      type: String,
      require: [true, "Please add a email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        ,
        "Please add a valid email address",
      ],
      unique: true,
    },
    phone: {
      type: Number,
      require: [true, "Please add a phone number"],
      match: [/^(?:0|\+84)[1-9][0-9]{8,9}$/, "Please add a valid phone number"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "visitor"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
