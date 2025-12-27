import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4 max-w-sm">

        <Link 
          to="/admin/add-category" 
          className="block bg-blue-500 hover:bg-blue-600 text-white p-3 rounded shadow"
        >
          ➕ Add Category
        </Link>

        <Link 
          to="/admin/add-product" 
          className="block bg-green-500 hover:bg-green-600 text-white p-3 rounded shadow"
        >
          🐟 Add Product
        </Link>

        <Link 
          to="/admin/products" 
          className="block bg-purple-500 hover:bg-purple-600 text-white p-3 rounded shadow"
        >
          📦 Product List
        </Link>

        <Link 
          to="/admin/orders" 
          className="block bg-red-500 hover:bg-red-600 text-white p-3 rounded shadow"
        >
          🧾 Orders Panel
        </Link>

        <Link 
          to="/admin/analytics" 
          className="block bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded shadow"
        >
          📊 Analytics Dashboard
        </Link>

        {/* Logout */}
        <Link 
          to="/admin/login" 
          className="block bg-gray-800 hover:bg-black text-white p-3 rounded shadow text-center"
        >
          🚪 Logout
        </Link>

      </div>
    </div>
  );
}
