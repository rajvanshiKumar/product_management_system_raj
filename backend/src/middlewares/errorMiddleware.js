const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid product ID";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;

    const errors = Object.values(err.errors).map((error) => error.message);

    return res.status(statusCode).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Duplicate SKU
  if (err.code === 11000) {
    statusCode = 409;
    message = "SKU already exists";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
