import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosClient";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div className="pt-28 max-w-6xl mx-auto px-6">

      <h2 className="text-3xl font-bold mb-6">Product List</h2>

      <table className="w-full border shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">
                <img src={`http://localhost:5000/uploads/${p.images?.[0]}`} className="h-14 mx-auto"/>
              </td>

              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.categoryId?.name || "-"}</td>

              <td className="border p-2 flex gap-2 justify-center">
                <Link
                  to={`/edit-product/${p._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
