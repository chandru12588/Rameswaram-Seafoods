import { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import { Link } from "react-router-dom";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [updatingId, setUpdatingId] = useState("");

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
    alert("Product deleted successfully");
  };

  const toggleProductAvailability = async (id) => {
    try {
      setUpdatingId(id);
      const { data } = await api.put(`/products/toggle/${id}`);
      setProducts((current) =>
        current.map((item) => (item._id === id ? { ...item, available: data.product.available } : item))
      );
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update availability");
    } finally {
      setUpdatingId("");
    }
  };

  const getImageUrl = (p) => {
    const img = p.image || p.images?.[0];
    if (!img) return "/no-image.png";
    return img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL}/uploads/${img}`;
  };

  return (
    <div className="pt-24 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/dashboard" className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
            Back to Dashboard
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold">Manage Products</h2>
        </div>

        <Link to="/admin/add-product" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center">
          Add New Product
        </Link>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Untick a product to hide it from customer shop pages.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <div key={p._id} className="border rounded shadow hover:shadow-lg p-3 transition bg-white">
            <img
              src={getImageUrl(p)}
              alt={p.name}
              className="w-full h-44 object-cover rounded mb-2"
              onError={(e) => (e.target.src = "/no-image.png")}
            />

            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-green-700 font-semibold text-sm">Rs {p.price}/{p.unit}</p>

            <label className="flex items-center gap-2 mt-3 text-sm">
              <input
                type="checkbox"
                checked={Boolean(p.available)}
                disabled={updatingId === p._id}
                onChange={() => toggleProductAvailability(p._id)}
              />
              Available in Shop
            </label>

            <div className="flex justify-between mt-3 gap-2">
              <Link to={`/admin/edit-product/${p._id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
