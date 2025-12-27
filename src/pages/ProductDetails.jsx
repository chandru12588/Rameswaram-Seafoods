import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosClient";
import { useCart } from "../store/cartStore";

export default function ProductDetails() {
  const { id } = useParams();
  const addToCart = useCart((s) => s.addToCart);
  const toggleCart = useCart((s) => s.toggleCart);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);        // 🔥 added
  const [unit] = useState("kg");                      // You can make dynamic later

  useEffect(() => {
    api.get("/products")
      .then(res => setProduct(res.data.find(p => p._id === id)))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div className="text-center p-20 text-lg">Loading...</div>;

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      quantity,
      unit: product.unit || unit        // use product.unit if exists
    });
    toggleCart();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-32">

      {/* IMAGE GALLERY */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {product.images?.map((img, i) => (
          <img 
            key={i}
            src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
            className="h-60 rounded shadow-md object-cover"
          />
        ))}
      </div>

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-teal-700 text-xl font-semibold mt-1">
        ₹{product.price} / {product.unit || "kg"}
      </p>

      <p className="mt-3 text-gray-600 leading-relaxed">{product.description}</p>

      {/* 🔥 Quantity Selector */}
      <div className="mt-5 flex items-center gap-3">
        <span className="font-semibold">Quantity:</span>
        <select
          value={quantity}
          onChange={(e)=>setQuantity(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="text-gray-700">{product.unit || "kg"}</span>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-6 bg-teal-600 w-full text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
      >
        🛒 Add {quantity} {product.unit || "kg"} to Cart
      </button>
    </div>
  );
}
