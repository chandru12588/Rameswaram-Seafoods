import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosClient";
import { resolveProductImage } from "../utils/imageUrl";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    unit: "",
    categoryId: "",
    description: "",
    whatsappNumber: "",
    minOrderQty: 0,
    image: "",
    images: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);

      setPreview(resolveProductImage(data));
    } catch {
      alert("Product not found");
    }
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("unit", product.unit);
    formData.append("categoryId", product.categoryId);
    formData.append("description", product.description);
    formData.append("whatsappNumber", product.whatsappNumber);
    formData.append("minOrderQty", product.minOrderQty);

    if (imageFile) formData.append("images", imageFile);

    await api.put(`/products/update/${id}`, formData);
    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="pt-24 p-6 max-w-4xl mx-auto">

      {/* 🔥 Back Button + Title */}
      <div className="flex justify-center mb-6 relative">
        <Link
          to="/admin/products"
          className="absolute left-0 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Back to Products
        </Link>

        <h2 className="text-3xl font-bold">✏ Edit Product</h2>
      </div>

      <div className="space-y-3">

        <input className="border p-3 w-full rounded"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <input className="border p-3 w-full rounded"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <input className="border p-3 w-full rounded"
          placeholder="Unit (kg / piece)"
          value={product.unit}
          onChange={(e) => setProduct({ ...product, unit: e.target.value })}
        />

        <input className="border p-3 w-full rounded"
          placeholder="Category ID"
          value={product.categoryId}
          onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
        />

        <textarea
          className="border p-3 w-full rounded"
          rows="5"
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded"
          type="number"
          min="0"
          step="0.5"
          placeholder="Minimum order quantity"
          value={product.minOrderQty}
          onChange={(e) => setProduct({ ...product, minOrderQty: Number(e.target.value) })}
        />

        <select className="border p-3 w-full rounded"
          value={product.whatsappNumber}
          onChange={(e) => setProduct({ ...product, whatsappNumber: e.target.value })}
        >
          <option value="919655244550">Seafood Number (919655244550)</option>
          <option value="8248579662">Spice Number (8248579662)</option>
        </select>
      </div>

      {/* Current Image preview */}
      <div className="mt-6 text-center">
        <p className="font-semibold mb-2 text-lg">Current Image</p>

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded shadow border mx-auto"
          />
        ) : (
          <div className="w-48 h-48 border flex items-center justify-center rounded mx-auto bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Upload Image */}
      <div className="mt-5">
        <p className="font-semibold mb-1">Change Image (optional)</p>
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={updateProduct}
        className="bg-teal-600 text-white py-3 px-5 rounded w-full mt-6 hover:bg-teal-700"
      >
        💾 Save Changes
      </button>

    </div>
  );
}
