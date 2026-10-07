import { useState } from "react";

import productsData from "./data/products.json";

import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";

const App = () => {
  // Products State

  const [products, setProducts] = useState(productsData);

  // Search State

  const [search, setSearch] = useState("");

  // =========================
  // Filter States

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // Form State

  const emptyProduct = {
    productName: "",
    sku: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subCategory: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyProduct);

  // =========================
  // Form Visibility
  // =========================
  const [showForm, setShowForm] = useState(false);

  // =========================
  // Edit State
  // =========================
  const [editingProductId, setEditingProductId] = useState(null);

  // =========================
  // Filter Products
  // =========================
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      product.productName.toLowerCase().includes(searchText) ||
      product.sku.toLowerCase().includes(searchText);

    const matchesCategory = category === "" || product.category === category;

    const matchesSubCategory =
      subCategory === "" || product.subCategory === subCategory;

    const matchesStatus = status === "" || product.status === status;

    return (
      matchesSearch && matchesCategory && matchesSubCategory && matchesStatus
    );
  });

  // =========================
  // Add / Update Product
  // =========================
  const handleSubmit = (productData) => {
    // UPDATE
    if (editingProductId !== null) {
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProductId
            ? {
                ...productData,
                id: editingProductId,
              }
            : product,
        ),
      );
    } else {
      // ADD
      const newProduct = {
        ...productData,
        id: Date.now(),
      };

      setProducts((previousProducts) => [...previousProducts, newProduct]);
    }

    // Reset form
    setFormData(emptyProduct);
    setEditingProductId(null);
    setShowForm(false);
  };

  // =========================
  // Edit Product
  // =========================
  const handleEdit = (product) => {
    setFormData({
      productName: product.productName,
      sku: product.sku,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      subCategory: product.subCategory,
      status: product.status,
    });

    setEditingProductId(product.id);
    setShowForm(true);
  };

  // =========================
  // Delete Product
  // =========================
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id),
    );
  };

  // =========================
  // Open Add Form
  // =========================
  const handleAddProduct = () => {
    setFormData(emptyProduct);
    setEditingProductId(null);
    setShowForm(true);
  };

  // =========================
  // Cancel Form
  // =========================
  const handleCancel = () => {
    setFormData(emptyProduct);
    setEditingProductId(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>Product Management System</h1>

        <button onClick={handleAddProduct}>Add Product</button>
      </header>

      {/* Search */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Filters */}
      <Filters
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        status={status}
        setStatus={setStatus}
      />

      {/* Add / Edit Form */}
      {showForm && (
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={editingProductId !== null}
        />
      )}

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit it will do later */}
    </div>
  );
};

export default App;
