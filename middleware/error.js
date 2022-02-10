const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // log error
  console.log(err);
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value) => value.message + " "
    );
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || "Server error" });
};

module.exports = errorHandler;
