import React, { useState } from "react";
import api from "../utils/axiosClient";   // 🔥 use global axios instance
import { Link } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");

  const add = async () => {
    if (!name.trim()) return alert("⚠ Enter category name");

    try {
      await api.post("/categories/add", { name });   // 🔥 localhost removed
      alert("✔ Category Added Successfully!");
      setName("");
    } catch (err) {
      console.log(err);
      alert("❌ Failed to add category (Check server)");
    }
  };

  return (
    <div className="pt-24 p-6 max-w-md mx-auto">

      {/* Back Button */}
      <Link 
        to="/admin/dashboard" 
        className="bg-black text-white px-4 py-2 rounded inline-block mb-4"
      >
        ⬅ Back to Dashboard
      </Link>

      <h1 className="text-xl font-bold mb-4">➕ Add Category</h1>

      <input
        type="text"
        placeholder="Category Name"
        className="border p-2 w-full mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button 
        onClick={add} 
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full text-lg"
      >
        Add Category
      </button>
    </div>
  );
}
