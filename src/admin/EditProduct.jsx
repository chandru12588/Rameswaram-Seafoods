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

  const [imageFiles, setImageFiles] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => () => {
    gallery.filter((item) => item.preview.startsWith("blob:")).forEach((item) => URL.revokeObjectURL(item.preview));
  }, [gallery]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);

      const images = data.images?.length ? data.images : data.image ? [data.image] : [];
      setGallery(images.map((url) => ({ url, preview: url, file: null })));
    } catch {
      alert("Product not found");
    }
  };

  const updateProduct = async () => {
    setSaving(true);
    setError("");
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("unit", product.unit);
    formData.append("categoryId", product.categoryId);
    formData.append("description", product.description);
    formData.append("whatsappNumber", product.whatsappNumber);
    formData.append("minOrderQty", product.minOrderQty);

    const keptImages = gallery.filter((item) => !item.file).map((item) => item.url);
    formData.append("existingImages", JSON.stringify(keptImages));
    gallery.filter((item) => item.file).forEach((item) => formData.append("images", item.file));

    try {
      await api.put(`/products/update/${id}`, formData);
      const { data: savedProduct } = await api.get(`/products/${id}`, {
        params: { _imageRefresh: Date.now() },
      });
      setProduct(savedProduct);
      const savedImages = savedProduct.images?.length ? savedProduct.images : savedProduct.image ? [savedProduct.image] : [];
      setGallery(savedImages.map((url) => ({ url, preview: url, file: null })));
      if (savedImages.length !== keptImages.length + gallery.filter((item) => item.file).length) {
        setError("The server did not save the updated image gallery. Deploy the latest backend updateProduct change, then try again.");
        return;
      }
      setImageFiles([]);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update product. Please try again.");
    } finally {
      setSaving(false);
    }
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

        {gallery.length ? (
          <div className="flex flex-wrap justify-center gap-3">
            {gallery.map((item, index) => (
              <div key={`${item.preview}-${index}`} className="relative">
                <img src={item.file ? item.preview : resolveProductImage({ images: [item.url] })} alt={`Product image ${index + 1}`} className="w-32 h-32 object-cover rounded shadow border" />
                <div className="flex gap-1 mt-1">
                  <button type="button" onClick={() => document.getElementById(`replace-image-${index}`).click()} className="flex-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">Replace</button>
                  <button type="button" onClick={() => setGallery((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="flex-1 bg-red-600 text-white text-xs px-2 py-1 rounded">Delete</button>
                </div>
                <input id={`replace-image-${index}`} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setGallery((items) => items.map((entry, itemIndex) => itemIndex === index ? { url: entry.url, preview: URL.createObjectURL(file), file } : entry));
                  e.target.value = "";
                }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-48 h-48 border flex items-center justify-center rounded mx-auto bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Upload Image */}
      <div className="mt-5">
        <input
          id="product-image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (gallery.length + files.length > 10) {
              setError("Choose up to 10 images.");
              e.target.value = "";
              return;
            }
            setError("");
            setGallery((items) => [...items, ...files.map((file) => ({ url: "", preview: URL.createObjectURL(file), file }))]);
          }}
        />
        <label
          htmlFor="product-image-upload"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-5 py-3 rounded cursor-pointer hover:bg-blue-700 transition"
        >
          Upload Images
        </label>
        <p className="text-sm text-gray-500 mt-2">Add, replace, or delete images. You can keep up to 10 images; changes apply when saved.</p>
        {error && <p role="alert" className="text-sm text-red-600 mt-2">{error}</p>}
      </div>

      {/* Save Button */}
      <button
        onClick={updateProduct}
        disabled={saving}
        className="bg-teal-600 text-white py-3 px-5 rounded w-full mt-6 hover:bg-teal-700"
      >
        💾 Save Changes
      </button>

    </div>
  );
}
