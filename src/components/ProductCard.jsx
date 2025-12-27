import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";

// ================= Notes Modal =================
function NotesModal({ onClose, onAdd }) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-md shadow-xl">

        <h2 className="text-xl font-bold mb-2">Add Preparation Notes</h2>
        <p className="text-sm text-gray-600 mb-2">
          Tell us how you want your meat/fish prepared:
          <br/>• No Liver • Small Cut • Medium Cut • Remove Head • Fillet etc.
        </p>

        <textarea
          className="w-full border rounded p-2 min-h-[80px]"
          placeholder="Example: Remove liver, medium cut pieces"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={() => onAdd(note)}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= Product Card =================
export default function ProductCard({ item }) {
  const navigate = useNavigate();
  const addToCart = useCart(s => s.addToCart);
  const toggleCart = useCart(s => s.toggleCart);

  const [openNote, setOpenNote] = useState(false);

  // Backend Live URL fix 🔥
  const BASE_URL = "https://rms-backend-44od.onrender.com";

  const mainImage = item.images?.[0]?.startsWith("http")
    ? item.images[0]
    : `${BASE_URL}/uploads/${item.images?.[0]}`;

  const handleAdd = (note) => {
    addToCart({ ...item, note });
    toggleCart();
    setOpenNote(false);
  };

  return (
    <div className="border p-4 shadow hover:shadow-lg rounded text-center">

      <img
        src={mainImage}
        className="w-full h-48 object-cover rounded cursor-pointer"
        onClick={() => navigate(`/product/${item._id}`)}
      />

      <h3 className="font-bold text-lg mt-3">{item.name}</h3>
      <p className="text-teal-700 font-semibold">₹{item.price}/{item.unit || "kg"}</p>

      {/* Open Notes Popup instead of direct add */}
      <button 
        onClick={() => setOpenNote(true)}
        className="mt-3 w-full bg-orange-500 text-white py-2 rounded">
        Add to Cart
      </button>

      <button 
        onClick={() => navigate(`/product/${item._id}`)}
        className="block mt-2 text-sm text-blue-600 underline">
        View Details
      </button>

      {openNote && (
        <NotesModal 
          onClose={() => setOpenNote(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
