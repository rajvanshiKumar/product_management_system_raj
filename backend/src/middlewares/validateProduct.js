const validateProduct = (req, res, next) => {
  let { productName, sku, price, stock, category, subCategory, status } =
    req.body;

  const errors = [];

  // Required fields
  if (!productName || !productName.trim()) {
    errors.push("Product name is required");
  }

  if (!sku || !sku.trim()) {
    errors.push("SKU is required");
  }

  if (price === undefined || price === "") {
    errors.push("Price is required");
  }

  if (stock === undefined || stock === "") {
    errors.push("Stock is required");
  }

  if (!category) {
    errors.push("Category is required");
  }

  if (!subCategory) {
    errors.push("Sub-category is required");
  }

  if (!status) {
    errors.push("Status is required");
  }

  // Convert numeric values
  const numericPrice = Number(price);
  const numericStock = Number(stock);

  // Price validation
  if (price !== undefined && price !== "") {
    if (Number.isNaN(numericPrice)) {
      errors.push("Price must be a valid number");
    } else if (numericPrice < 0) {
      errors.push("Price cannot be negative");
    }
  }

  // Stock validation
  if (stock !== undefined && stock !== "") {
    if (Number.isNaN(numericStock)) {
      errors.push("Stock must be a valid number");
    } else if (numericStock < 0) {
      errors.push("Stock cannot be negative");
    } else if (!Number.isInteger(numericStock)) {
      errors.push("Stock must be a whole number");
    }
  }

  // Category validation
  const allowedCategories = ["Electronics", "Fashion", "Furniture"];

  if (category && !allowedCategories.includes(category)) {
    errors.push("Invalid category");
  }

  // Status validation
  const allowedStatuses = ["Active", "Inactive"];

  if (status && !allowedStatuses.includes(status)) {
    errors.push("Invalid status");
  }

  // Return errors
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Store converted numbers in request body
  req.body.price = numericPrice;
  req.body.stock = numericStock;

  next();
};

module.exports = validateProduct;
