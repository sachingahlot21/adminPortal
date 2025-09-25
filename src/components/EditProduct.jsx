// src/pages/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import initialProducts from "../data/initialProducts";
import sampleCategories from "../data/sampleCategories";

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import categories from "../data/categories"; 

export default function EditProduct() {
    const { id } = useParams(); // productid from route
    const navigate = useNavigate();

    const product = initialProducts.find((p) => p.productid === id);

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
        stock: 0,
        availability: "",
        usps: product.usps?.length ? product.usps : [""],
        offer: "none",
        count: 0,
        thumbnail: null,
        colors: [],

    });

    // const [form, setForm] = useState({
    //   productid: "",
    //   itemName: "",
    //   description: "",
    //   category: "",
    //   rating: "",
    //   sold: "",
    //   priceBefore: "",
    //   discount: "", 
    //   price: "", 
    //   offer: "none",
    //   usps: [""],
    //   thumbnail: null, 
    //   stock: 0,
    //   availability: "In Stock",
    //   colors: [], 
    //   count: 0,
    // });


    useEffect(() => {
        console.log("product", product)

        if (product) {
            setForm((prev) => ({
                ...prev,        // keep defaults
                ...product,     // overwrite with product values
            }));
        }

    }, [product]);

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            let updated = { ...prev, [name]: value };

            // auto-calc price
            if (name === "discount" || name === "priceBefore") {
                const priceBefore = parseFloat(
                    name === "priceBefore" ? value : prev.priceBefore
                );
                const discount = parseFloat(
                    name === "discount" ? value : prev.discount
                );
                if (!isNaN(priceBefore) && !isNaN(discount)) {
                    updated.price = (priceBefore - (priceBefore * discount) / 100).toFixed(
                        2
                    );
                }
            }

            return updated;
        });
    };

    const incStock = () => {
        setForm((prev) => ({ ...prev, stock: prev.stock + 1 }));
    };
    const decStock = () => {
        setForm((prev) => ({ ...prev, stock: Math.max(0, prev.stock - 1) }));
    };

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, thumbnail: file }));
    };

    // colors helpers
    const addColor = () => {
        setForm((prev) => ({
            ...prev,
            colors: [...prev.colors, { colorName: "", images: [] }],
        }));
    };

    const setColorName = (idx, val) => {
        const newColors = [...form.colors];
        newColors[idx].colorName = val;
        setForm((prev) => ({ ...prev, colors: newColors }));
    };

    const triggerColorFileInput = (idx) => {
        document.getElementById(`color-file-${idx}`).click();
    };

    const handleColorImageUpload = (idx, files) => {
        const newColors = [...form.colors];
        const images = Array.from(files);
        newColors[idx].images = [...newColors[idx].images, ...images].slice(0, 5); // max 5
        setForm((prev) => ({ ...prev, colors: newColors }));
    };

    const removeColor = (idx) => {
        const newColors = [...form.colors];
        newColors.splice(idx, 1);
        setForm((prev) => ({ ...prev, colors: newColors }));
    };

    const removeColorImage = (cIdx, imgIdx) => {
        const newColors = [...form.colors];
        newColors[cIdx].images.splice(imgIdx, 1);
        setForm((prev) => ({ ...prev, colors: newColors }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated product data:", form);
        // TODO: Replace with API or state update
        navigate(-1);
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

    return (
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
                        {sampleCategories.map((c) => (
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
            </div>

            {/* Thumbnail (single) */}
            {/* <div>
                <label className="block mb-1 font-medium">Thumbnail Image (single)</label>
                <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
                {form.thumbnail && (
                    <p className="mt-2 text-sm text-green-600">
                        Selected: {form.thumbnail.name || form.thumbnail}
                    </p>
                )}
            </div> */}
            <div>
                <label className="block mb-2 font-medium">Thumbnail Image</label>

                {/* Image Preview */}
                <div className="relative w-40 h-40 border rounded flex items-center justify-center overflow-hidden bg-gray-50">
                    <img
                        src={
                            form.thumbnail
                                ? typeof form.thumbnail === "string"
                                    ? form.thumbnail
                                    : URL.createObjectURL(form.thumbnail)
                                : "https://via.placeholder.com/150?text=No+Image"
                        }
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                    />

                    {/* Remove Button */}
                    {form.thumbnail && (
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, thumbnail: null })}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                            title="Remove image"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* Change/Upload Button */}
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
                    <label className="block font-medium">
                        Colors (each color can have up to 5 images)
                    </label>
                    <button
                        type="button"
                        onClick={addColor}
                        className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                    >
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
                                    <label className="block mb-1 text-sm font-medium">
                                        Color Name
                                    </label>
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
                                                src={
                                                    typeof img === "string" ? img : URL.createObjectURL(img)
                                                }
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
                                    <p className="text-sm text-gray-500">
                                        No images for this color yet.
                                    </p>
                                )}
                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                Max 5 images per color
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Save Product
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
    );
}
