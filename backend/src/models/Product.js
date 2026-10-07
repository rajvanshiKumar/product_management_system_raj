//const Product = require("./Product");
const Product = require("../models/Product");
// Get all products
const getAllProducts = async (filters = {}) => {
  const query = {};

  if (filters.search) {
    query.$or = [
      {
        productName: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.subCategory) {
    query.subCategory = filters.subCategory;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  return await Product.find(query).sort({ createdAt: -1 });
};

// Get product by ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

// Create product
const createProduct = async (productData) => {
  return await Product.create(productData);
};

// Update product
const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

// Delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
