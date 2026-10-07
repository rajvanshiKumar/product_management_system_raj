import React from "react";
const Filters = ({
  category,
  setCategory,
  subCategory,
  setSubCategory,
  status,
  setStatus,
}) => {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);

    
    setSubCategory("");
  };

  return (
    <div className="filters-container">
      {/* Category */}
      <div>
        <label>Category</label>

        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {/* Sub-Category */}
      <div>
        <label>Sub-Category</label>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={!category}
        >
          <option value="">All Sub-Categories</option>

          {category === "Electronics" && (
            <>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphones">Headphones</option>
            </>
          )}

          {category === "Fashion" && (
            <>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
            </>
          )}

          {category === "Furniture" && (
            <>
              <option value="Chair">Chair</option>
              <option value="Table">Table</option>
            </>
          )}
        </select>
      </div>

      {/* Status */}
      <div>
        <label>Status</label>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
