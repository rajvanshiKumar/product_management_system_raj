import React from "react";
const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.subCategory}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>

                <td>
                  <button onClick={() => onEdit(product)}>Edit</button>

                  <button onClick={() => onDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
