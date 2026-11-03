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
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => () => {
    previews.filter((preview) => preview.startsWith("blob:")).forEach(URL.revokeObjectURL);
  }, [previews]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);

      const images = data.images?.length ? data.images : data.image ? [data.image] : [];
      setPreviews(images);
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

    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await api.put(`/products/update/${id}`, formData);
      const { data: savedProduct } = await api.get(`/products/${id}`, {
        params: { _imageRefresh: Date.now() },
      });
      setProduct(savedProduct);
      const savedImages = savedProduct.images?.length ? savedProduct.images : savedProduct.image ? [savedProduct.image] : [];
      setPreviews(savedImages);
      const previousImages = product.images || [];
      const newImageIsPrimary = savedProduct.images?.[0] && !previousImages.includes(savedProduct.images[0]);
      if (imageFiles.length && !newImageIsPrimary) {
        setError("The server still reports the old image. Deploy the latest backend updateProduct change, then upload again.");
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

        {previews.length ? (
          <div className="flex flex-wrap justify-center gap-3">
            {previews.map((preview, index) => (
              <img key={`${preview}-${index}`} src={preview.startsWith("blob:") ? preview : resolveProductImage({ images: [preview] })} alt={`Product image ${index + 1}`} className="w-32 h-32 object-cover rounded shadow border" />
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
            if (files.length > 10) {
              setError("Choose up to 10 images.");
              e.target.value = "";
              return;
            }
            setError("");
            setImageFiles(files);
            setPreviews(files.map((file) => URL.createObjectURL(file)));
          }}
        />
        <label
          htmlFor="product-image-upload"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-5 py-3 rounded cursor-pointer hover:bg-blue-700 transition"
        >
          Upload Images
        </label>
        <p className="text-sm text-gray-500 mt-2">Choose up to 10 images. Selected images replace the current gallery when saved.</p>
        {imageFiles.length > 0 && <p className="text-sm text-green-700 mt-1">Selected {imageFiles.length} image{imageFiles.length === 1 ? "" : "s"}.</p>}
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
