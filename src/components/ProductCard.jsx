import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { resolveProductImage } from "../utils/imageUrl";

function NotesModal({ onClose, onAdd }) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 rounded-2xl w-full max-w-md shadow-2xl border border-rose-100 fade-up">
        <h2 className="text-xl font-extrabold mb-2 text-slate-900">Add Preparation Notes</h2>
        <p className="text-sm text-slate-600 mb-3">
          Tell us how you want your fish prepared. Example: No liver, small cut, medium cut, remove head, fillet.
        </p>

        <textarea
          className="w-full input-polish p-3 min-h-[90px]"
          placeholder="Example: Remove liver, medium cut pieces"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg font-medium">
            Cancel
          </button>

          <button onClick={() => onAdd(note)} className="px-4 py-2 rounded-lg animated-gradient-btn text-white font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ item }) {
  const navigate = useNavigate();
  const addToCart = useCart((s) => s.addToCart);
  const toggleCart = useCart((s) => s.toggleCart);

  const minOrderQty = item.minOrderQty || (String(item.unit || "kg").toLowerCase() === "kg" ? 0.5 : 1);
  const [openNote, setOpenNote] = useState(false);
  const [selectedQty, setSelectedQty] = useState(minOrderQty);

  const isKg = String(item.unit || "kg").toLowerCase() === "kg";
  const mainImage = resolveProductImage(item);

  const quantityOptions = isKg
    ? [minOrderQty, minOrderQty + 0.5, minOrderQty + 1, minOrderQty + 1.5, minOrderQty + 2]
    : [minOrderQty, minOrderQty + 1, minOrderQty + 2, minOrderQty + 3, minOrderQty + 4];

  const handleAdd = (note) => {
    addToCart({ ...item, note, quantity: isKg ? selectedQty : 1 });
    toggleCart();
    setOpenNote(false);
  };

  return (
    <div className="premium-card p-4 text-center h-full flex flex-col">
      <img
        src={mainImage}
        alt={item.name}
        className="w-full h-48 object-cover rounded-xl cursor-pointer"
        onClick={() => navigate(`/product/${item._id}`)}
      />

      <h3 className="font-extrabold text-lg mt-3 text-slate-900">{item.name}</h3>
      <p className="text-rose-700 font-bold">Rs {item.price}/{item.unit || "kg"}</p>

      {isKg && (
        <div className="mt-2 flex items-center justify-center gap-2 text-sm flex-wrap">
          {quantityOptions.map((qty) => (
            <button
              key={qty}
              onClick={() => setSelectedQty(qty)}
              className={`px-3 py-1.5 rounded-lg border ${selectedQty === qty ? "bg-rose-700 text-white border-rose-700" : "bg-white border-slate-200"}`}
            >
              {qty} kg
            </button>
          ))}
        </div>
      )}

      <button onClick={() => setOpenNote(true)} className="mt-3 w-full animated-gradient-btn text-white py-2.5 rounded-lg font-semibold">
        Add to Cart
      </button>

      <button
        onClick={() => navigate(`/product/${item._id}`)}
        className="block mt-2 text-sm text-rose-700 underline underline-offset-2"
      >
        View Details
      </button>

      {openNote && <NotesModal onClose={() => setOpenNote(false)} onAdd={handleAdd} />}
    </div>
  );
}
