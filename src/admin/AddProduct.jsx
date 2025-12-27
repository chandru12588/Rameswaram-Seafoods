import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]); // ⭐ Multi images support
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data));
  }, []);

  const handleImageUpload = (e) => {
    setImages([...e.target.files]); // Store multiple files
  };

  const addProduct = async () => {
    if (!name || !price || !categoryId) {
      return alert("⚠ Please fill all required fields");
    }

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("price", price);
      form.append("unit", unit);
      form.append("categoryId", categoryId);
      form.append("description", description);

      // ⭐ Submit multiple images
      images.forEach(img => form.append("images", img));

      await axios.post("http://localhost:5000/api/products/add", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✔ Product Added Successfully");

      setName(""); setPrice(""); setUnit("kg");
      setCategoryId(""); setImages([]); setDescription("");

    } catch (err) {
      console.log(err);
      alert("❌ Failed to add Product. Check backend.");
    }
  };

  return (
    <div className="pt-24 p-6 max-w-md mx-auto">

      {/* 🔥 Updated route to fix 404 */}
      <Link to="/admin/dashboard" className="bg-black text-white px-4 py-2 rounded inline-block mb-4">
        ⬅ Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-4">➕ Add New Product</h1>

      <div className="space-y-3">

        <input type="text" placeholder="Product Name"
          className="border p-2 w-full" value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input type="number" placeholder="Price"
          className="border p-2 w-full" value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <select className="border p-2 w-full" value={unit} onChange={(e)=>setUnit(e.target.value)}>
          <option value="kg">kg</option>
          <option value="piece">piece</option>
          <option value="100g">100g</option>
        </select>

        <select className="border p-2 w-full" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <textarea placeholder="Description (optional)"
          className="border p-2 w-full h-24"
          value={description} onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

        {/* Multi Image Upload */}
        <input type="file" accept="image/*" multiple className="border p-2 w-full" onChange={handleImageUpload}/>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)}
                className="h-24 w-full object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button onClick={addProduct}
          className="bg-green-600 text-white p-2 rounded w-full mt-3 text-lg">
          Add Product
        </button>

      </div>
    </div>
  );
}
