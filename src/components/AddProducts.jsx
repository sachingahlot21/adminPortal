// src/pages/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  // sample categories (replace with real source later)
  const categories = [
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

  const [form, setForm] = useState({
    productid: "",
    itemName: "",
    description: "",
    category: "",
    rating: "",
    sold: "",
    priceBefore: "",
    discount: "",
    price: "",
    offer: "none",
    usps: [""],
    thumbnail: null,
    stock: 0,
    availability: "In Stock",
    colors: [],
    count: 0,
  });

  // ---------- Helpers ----------
  const calcPriceAfterDiscount = (priceBefore, discount) => {
    const pb = parseFloat(priceBefore) || 0;
    const d = parseFloat(discount) || 0;
    if (pb <= 0) return "";
    const finalPrice = pb - (pb * d) / 100;
    return Math.round(finalPrice * 100) / 100; // round to 2 decimals
  };

  // ---------- Generic input handler ----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle price calculation on priceBefore or discount change
    if (name === "priceBefore" || name === "discount") {
      const updated = { ...form, [name]: value };
      updated.price = calcPriceAfterDiscount(updated.priceBefore, updated.discount);
      setForm(updated);
      return;
    }

    // normal updates
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- Thumbnail upload ----------
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, thumbnail: file }));
  };

  // ---------- Stock + / - ----------
  const incStock = () => setForm((p) => ({ ...p, stock: Number(p.stock || 0) + 1 }));
  const decStock = () =>
    setForm((p) => ({ ...p, stock: Math.max(0, Number(p.stock || 0) - 1) }));

  // ---------- Color management ----------
  const addColor = () => {
    setForm((p) => ({ ...p, colors: [...p.colors, { colorName: "", images: [] }] }));
  };

  const removeColor = (index) => {
    setForm((p) => {
      const colors = [...p.colors];
      colors.splice(index, 1);
      return { ...p, colors };
    });
  };

  const setColorName = (index, name) => {
    setForm((p) => {
      const colors = [...p.colors];
      colors[index].colorName = name;
      return { ...p, colors };
    });
  };

  // Trigger file input click for a color
  const triggerColorFileInput = (index) => {
    const id = `color-file-${index}`;
    const el = document.getElementById(id);
    if (el) el.click();
  };

  // Handle color image(s) uploaded for a color
  // const handleColorImageUpload = (index, fileList) => {

  //   console.log(fileList , index)
  //    console.log(form)
  //   if (!fileList) return;
  //   const files = Array.from(fileList);
  //   console.log("files" , files)
  //   setForm((p) => {
  //     const colors = [...p.colors];
  //     const current = colors[index].images || [];
  //     console.log("current" , current)
  //     if (current.length + files.length > 5) {
  //       alert("Max 5 images allowed per color.");
  //       return p;
  //     }
  //     colors[index].images = [...current, ...files];
  //     return { ...p, colors };
  //   });
  // };

  const handleColorImageUpload = (idx, files) => {
    const newColors = [...form.colors];
    const images = Array.from(files);
    newColors[idx].images = [...newColors[idx].images, ...images].slice(0, 5); // max 5
    setForm((prev) => ({ ...prev, colors: newColors }));
  };


  const removeColorImage = (colorIndex, imgIndex) => {
    setForm((p) => {
      const colors = [...p.colors];
      const imgs = [...colors[colorIndex].images];
      imgs.splice(imgIndex, 1);
      colors[colorIndex].images = imgs;
      return { ...p, colors };
    });
  };

  // ---------- Submit ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare final product object matching your sample structure
    const product = {
      productid: form.productid || `prod_${Date.now()}`,
      itemName: form.itemName,
      description: form.description,
      category: form.category,
      rating: form.rating,
      sold: form.sold || 0,
      price: typeof form.price === "number" ? form.price : calcPriceAfterDiscount(form.priceBefore, form.discount),
      priceBefore: Number(form.priceBefore) || 0,
      discount: form.discount ? `${form.discount}% off` : "0% off",
      offer: form.offer || "none",
      usp: form.usp,
      usp2: form.usp2,
      usp3: form.usp3,
      image: form.thumbnail, // thumbnail file or url
      count: form.count || 0,
      stock: Number(form.stock) || 0,
      availability: form.availability,
      colors: form.colors.map((c) => ({
        colorName: c.colorName,
        images: c.images, // array of File objects (or urls)
      })),
    };

    console.log("NEW PRODUCT (ready to send to backend):", product);

    // TODO: send to backend here (FormData if files are included)
    // Example:
    // const fd = new FormData(); fd.append('data', JSON.stringify(productMeta)); fd.append('thumbnail', form.thumbnail); etc.

    alert("Product prepared. Check console for the product object.");
    navigate("/admin/products/view"); // go back to product list
  };

  const handleUspChange = (index, value) => {
    const newUsps = [...form.usps];
    newUsps[index] = value;
    setForm({ ...form, usps: newUsps });
  };

  const addUspField = () => {
    if (form.usps.length < 3) {
      setForm({ ...form, usps: [...form.usps, ""] });
    }
  };

  const removeUspField = (index) => {
    if (form.usps.length > 1) {
      const newUsps = form.usps.filter((_, i) => i !== index);
      setForm({ ...form, usps: newUsps });
    }
  };


  // ---------- Render ----------
  return (
    <div className="p-6">
      <nav className="mb-4 text-sm text-gray-600">
        <span className="cursor-pointer text-blue-600 hover:underline">Products</span>{" "}
        / <span className="font-medium">Add Product</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
        {/* productid + name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product ID</label>
            <input
              name="productid"
              value={form.productid}
              onChange={handleChange}
              placeholder="e.g. neckBands2"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Item Name</label>
            <input
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* category + rating + sold */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <input
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="e.g. 4.8"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Units Sold</label>
            <input
              name="sold"
              type="number"
              value={form.sold}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* priceBefore + discount -> price */}
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block mb-1 font-medium">Price Before (Original)</label>
            <input
              name="priceBefore"
              type="number"
              value={form.priceBefore}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Discount (%)</label>
            <input
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Final Price</label>
            <input
              name="price"
              type="text"
              value={form.price}
              className="w-full border p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* stock + availability counter */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block mb-1 font-medium">Stock Quantity</label>
            <div className="inline-flex items-center border rounded overflow-hidden">
              <button
                type="button"
                onClick={decStock}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="text"
                value={form.stock}
                readOnly
                className="w-20 text-center outline-none p-2"
              />
              <button
                type="button"
                onClick={incStock}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Availability Status</label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Coming Soon</option>
            </select>
          </div>
        </div>

        {/* USPs */}
        {/* USP Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Unique Selling Points (USPs)</h3>

          <div className="grid md:grid-cols-3 gap-4">
            {form.usps.map((usp, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={usp}
                  onChange={(e) => handleUspChange(index, e.target.value)}
                  placeholder={`USP ${index + 1}`}
                  className="w-full border p-2 rounded"
                />
                {form.usps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUspField(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add USP Button */}
          {form.usps.length < 3 && (
            <button
              type="button"
              onClick={addUspField}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              + Add USP
            </button>
          )}
        </div>



        {/* offer + count */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Offer</label>
            <input
              name="offer"
              value={form.offer}
              onChange={handleChange}
              placeholder="none or special offer"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* <div>
            <label className="block mb-1 font-medium">Count</label>
            <input
              name="count"
              type="number"
              value={form.count}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div> */}
        </div>

        {/* Thumbnail (single) */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail Image</label>

          {/* Show preview only if image exists */}
          {form.thumbnail && (
            <div className="relative w-40 h-40 border rounded flex items-center justify-center overflow-hidden bg-gray-50">
              <img
                src={URL.createObjectURL(form.thumbnail)}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => setForm({ ...form, thumbnail: null })}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                title="Remove image"
              >
                ×
              </button>
            </div>
          )}

          {/* Upload / Change Button */}
          <label className="mt-3 inline-block">
            <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              {form.thumbnail ? "Change Image" : "Select Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
          </label>
        </div>



        {/* Colors section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block font-medium">Colors (each color can have up to 5 images)</label>
            <button type="button" onClick={addColor} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">
              + Add Color
            </button>
          </div>

          {form.colors.length === 0 && (
            <p className="text-sm text-gray-500 mb-3">No colors added yet.</p>
          )}

          <div className="space-y-4">
            {form.colors.map((c, idx) => (
              <div key={idx} className="border p-4 rounded bg-gray-50">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Color Name</label>
                    <input
                      type="text"
                      value={c.colorName}
                      onChange={(e) => setColorName(idx, e.target.value)}
                      placeholder="e.g. Black"
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() => triggerColorFileInput(idx)}
                      className="px-3 py-2 bg-green-600 text-white rounded"
                    >
                      Add Image(s)
                    </button>
                    <button
                      type="button"
                      onClick={() => removeColor(idx)}
                      className="px-3 py-2 bg-red-500 text-white rounded"
                    >
                      Remove Color
                    </button>
                  </div>
                </div>

                {/* Hidden file input for this color */}
                <input
                  id={`color-file-${idx}`}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleColorImageUpload(idx, e.target.files)}
                />

                {/* Thumbnails for this color's images */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.images && c.images.length > 0 ? (
                    c.images.map((img, iImg) => (
                      <div key={iImg} className="relative">
                        <img
                          src={typeof img === "string" ? img : URL.createObjectURL(img)}
                          alt={`color-${idx}-img-${iImg}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeColorImage(idx, iImg)}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No images for this color yet.</p>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-2">Max 5 images per color</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Product</button>
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
