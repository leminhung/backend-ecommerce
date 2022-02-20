const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const client = require("../config/redis");

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
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "visitor"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Check match password
UserSchema.methods.isMatchPassword = async function (passwordEnter) {
  console.log(passwordEnter, this.password);
  return await bcrypt.compare(passwordEnter, this.password);
};

// generate token and return
UserSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password token
UserSchema.methods.getResetpasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire =
    Date.now() + process.env.RESET_TOKEN_EXPIRE * 60 * 1000;
  return resetToken;
};

UserSchema.methods.signRefreshToken = async function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
  await client.set(this._id.toString(), refreshToken);
  return refreshToken;
};

module.exports = mongoose.model("User", UserSchema);
