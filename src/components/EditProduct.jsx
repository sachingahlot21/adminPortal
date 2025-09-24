// src/pages/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import initialProducts from "../data/initialProducts";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    // find product by id in demo list
    const prod = initialProducts.find((p) => p.id === id);
    if (prod) {
      setForm({ ...prod });
    } else {
      alert("Product not found!");
      navigate("/admin/products/view");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated product:", form);

    // 🚨 since we’re using demo .js data, this won’t persist
    // but you can update in-memory if needed
    alert("Product updated (check console)");
    navigate("/admin/products/view");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* add more fields from your AddProduct form */}

        <div className="pt-4 border-t">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="ml-3 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
