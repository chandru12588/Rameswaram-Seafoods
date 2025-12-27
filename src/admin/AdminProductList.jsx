import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import { Link } from "react-router-dom";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await api.delete(`/products/delete/${id}`);
    loadProducts();
    alert("Product deleted successfully 🚮");
  };

  // Handle cloudinary + local uploads
  const getImageUrl = (p) => {
    const img = p.image || p.images?.[0];
    if (!img) return "/no-image.png";

    return img.startsWith("http")
      ? img
      : `${import.meta.env.VITE_API_URL}/uploads/${img}`;
  };

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        
        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
          >
            ← Back to Dashboard
          </Link>

          <h2 className="text-3xl font-bold">📦 Manage Products</h2>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add New Product
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded shadow hover:shadow-lg p-3 transition bg-white">

            <img
              src={getImageUrl(p)}
              alt={p.name}
              className="w-full h-48 object-cover rounded mb-2"
              onError={(e) => (e.target.src = "/no-image.png")}
            />

            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-green-700 font-semibold text-sm">₹{p.price}/{p.unit}</p>

            <div className="flex justify-between mt-3">
              <Link
                to={`/admin/edit-product/${p._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                ✏ Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                🗑 Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
