import React, { useState } from "react";
import { FaTrash, FaEdit, FaEye, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sampleCategories = [
  "True Wireless Earbuds",
  "Personalised Products",
  "Neckbands",
  "Smart Watches",
  "Wireless Headphones",
  "Wireless Speakers",
  "Wired Headphones",
  "Wired Earphones",
  "Soundbars",
  "Gaming Series",
  "Party Speakers",
  "Chargers",
  "Power Banks",
];

const initialProducts = [
  {
    id: "neckBands2",
    name: "Rockerz 255 Pro+",
    description: "40 Hours Playback, 10mm Drivers, boAt Signature Sound",
    category: "Neckbands",
    rating: "4.8",
    sold: 427,
    price: 1299,
    priceBefore: 3990,
    discount: "67% off",
    stock: 20,
    status: "available",
    colors: [
      {
        colorName: "Black",
        images: [
          "https://picsum.photos/200/200?random=2",
          "https://picsum.photos/200/200?random=3",
        ],
      },
      {
        colorName: "Blue",
        images: [
          "https://picsum.photos/200/200?random=4",
          "https://picsum.photos/200/200?random=5",
        ],
      },
    ],
  },
  {
    id: "earbuds1",
    name: "Wireless Earbuds X1",
    description: "Crystal Clear Sound, Long Battery Life",
    category: "True Wireless Earbuds",
    rating: "4.5",
    sold: 320,
    price: 2999,
    priceBefore: 4999,
    discount: "40% off",
    stock: 15,
    status: "available",
    colors: [
      { colorName: "White", images: ["https://picsum.photos/200/200?random=7"] },
      { colorName: "Black", images: ["https://picsum.photos/200/200?random=8"] },
    ],
  },
];

const ViewProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" or "view"
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || p.category === filterCategory)
  );

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Open modal
  const openModal = (product, type) => {
    setSelectedProduct({ ...product });
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType("");
  };

  const handleStockChange = (delta) => {
    setSelectedProduct((prev) => ({
      ...prev,
      stock: Math.max(0, prev.stock + delta),
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
    );
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Products</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {sampleCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">{p.id}</td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.category}</td>
                <td className="py-2 px-4">₹{p.price}</td>
                <td className="py-2 px-4">{p.stock}</td>
                <td className="py-2 px-4 capitalize">{p.status}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => openModal(p, "view")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => openModal(p, "edit")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            {/* View Modal */}
            {modalType === "view" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-900 font-bold"
                  >
                    X
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Category:</strong> {selectedProduct.category}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedProduct.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{selectedProduct.price} (Before: ₹
                      {selectedProduct.priceBefore}, {selectedProduct.discount})
                    </p>
                    <p>
                      <strong>Stock:</strong> {selectedProduct.stock}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedProduct.status}
                    </p>
                  </div>

                  <div>
                    {selectedProduct.colors.map((c, i) => (
                      <div key={i} className="mb-4">
                        <p className="font-semibold">{c.colorName}</p>
                        <div className="flex gap-2 flex-wrap mt-2">
                          {c.images.map((img, j) => (
                            <img
                              key={j}
                              src={typeof img === "string" ? img : URL.createObjectURL(img)}
                              alt={c.colorName}
                              className="w-32 h-32 object-cover border rounded"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Edit Modal will come here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
