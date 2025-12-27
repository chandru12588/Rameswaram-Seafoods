import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");

  const add = async () => {
    if (!name.trim()) return alert("⚠ Enter category name");
    await axios.post("http://localhost:5000/api/categories/add", { name });

    alert("✔ Category Added Successfully!");
    setName("");
  };

  return (
    <div className="pt-24 p-6 max-w-md mx-auto">

      {/* 🔥 Fixed route */}
      <Link to="/admin/dashboard" className="bg-black text-white px-4 py-2 rounded inline-block mb-4">
        ⬅ Back to Dashboard
      </Link>

      <h1 className="text-xl font-bold mb-4">➕ Add Category</h1>

      <input
        type="text"
        placeholder="Category Name"
        className="border p-2 w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={add} className="bg-blue-600 text-white p-2 rounded w-full text-lg">
        Add Category
      </button>
    </div>
  );
}
