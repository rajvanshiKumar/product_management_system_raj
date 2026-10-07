import React from "react";
const ProductForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.productName.trim() ||
      !formData.sku.trim() ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      !formData.subCategory ||
      !formData.status
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (Number(formData.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    if (Number(formData.stock) < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label>Product Name *</label>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        {/* SKU */}
        <div>
          <label>SKU *</label>

          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>

        {/* Price */}
        <div>
          <label>Price *</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
          />
        </div>

        {/* Stock */}
        <div>
          <label>Stock *</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            min="0"
          />
        </div>

        {/* Category */}
        <div>
          <label>Category *</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {/* Sub-Category */}
        <div>
          <label>Sub-Category *</label>

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
          >
            <option value="">Select Sub-Category</option>

            {formData.category === "Electronics" && (
              <>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphones">Headphones</option>
              </>
            )}

            {formData.category === "Fashion" && (
              <>
                <option value="Shoes">Shoes</option>
                <option value="Jackets">Jackets</option>
              </>
            )}

            {formData.category === "Furniture" && (
              <>
                <option value="Chair">Chair</option>
                <option value="Table">Table</option>
              </>
            )}
          </select>
        </div>

        {/* Status */}
        <div>
          <label>Status *</label>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div>
          <button type="submit">
            {isEditing ? "Update Product" : "Add Product"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
