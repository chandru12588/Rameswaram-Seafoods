import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { resolveProductImage } from "../utils/imageUrl";

const CLEANING_CATEGORY_KEYWORDS = ["fish", "seafood", "meat", "chicken", "mutton", "prawn", "crab"];
const GROCERY_SPICE_KEYWORDS = ["spice", "grocery", "groceries", "masala", "dal", "pulses", "rice", "flour"];
const isCleaningCategory = (name = "") =>
  CLEANING_CATEGORY_KEYWORDS.some((keyword) => String(name).toLowerCase().includes(keyword));
const isGrocerySpiceCategory = (name = "") =>
  GROCERY_SPICE_KEYWORDS.some((keyword) => String(name).toLowerCase().includes(keyword));
const isParuppuProduct = (name = "") =>
  String(name).toLowerCase().includes("paruppu") || String(name).toLowerCase().includes("parupoo");

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
          className="w-full input-polish p-3 min-h-24"
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

  const isKg = String(item.unit || "kg").toLowerCase() === "kg";
  const isParuppu = isParuppuProduct(item.name || item.productName || "");
  const hasCustomMinQty = item.minOrderQty && Number(item.minOrderQty) > 0;
  const declaredQty = hasCustomMinQty ? Number(item.minOrderQty) : undefined;
  const minOrderQty = isParuppu
    ? Math.max(declaredQty || 3, 3)
    : hasCustomMinQty
    ? declaredQty
    : isKg
    ? 0.5
    : 1;

  const [openNote, setOpenNote] = useState(false);
  const [selectedQty, setSelectedQty] = useState(minOrderQty);

  const qtyStep = isParuppu ? 1 : isKg && minOrderQty < 1 ? 0.5 : 1;
  const quantityOptions = isKg
    ? Array.from(
        { length: Math.floor((25 - minOrderQty) / qtyStep) + 1 },
        (_, index) => Number((minOrderQty + index * qtyStep).toFixed(2))
      )
    : [minOrderQty, minOrderQty + 1, minOrderQty + 2, minOrderQty + 3, minOrderQty + 4];

  const useSelect = isKg && quantityOptions.length > 7;
  const showNotes = isCleaningCategory(item.categoryId?.name || item.categoryName || item.category || "");

  const mainImage = resolveProductImage(item);

  const handleAdd = (note = "") => {
    addToCart({ ...item, note, quantity: isKg ? selectedQty : 1 });
    toggleCart();
    setOpenNote(false);
  };

  const handleButtonClick = () => {
    if (showNotes) {
      setOpenNote(true);
    } else {
      handleAdd("");
    }
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
      {minOrderQty > 0 && (
        <p className="text-sm text-slate-500 mt-1">Min order: {minOrderQty} {item.unit || "kg"}</p>
      )}

      {isKg && (
        <div className="mt-2 flex items-center justify-center gap-2 text-sm flex-wrap">
          {useSelect ? (
            <select
              value={selectedQty}
              onChange={(e) => setSelectedQty(Number(e.target.value))}
              className="input-polish p-2 rounded-lg border"
            >
              {quantityOptions.map((qty) => (
                <option key={qty} value={qty}>
                  {qty} kg
                </option>
              ))}
            </select>
          ) : (
            quantityOptions.map((qty) => (
              <button
                key={qty}
                onClick={() => setSelectedQty(qty)}
                className={`px-3 py-1.5 rounded-lg border ${selectedQty === qty ? "bg-rose-700 text-white border-rose-700" : "bg-white border-slate-200"}`}
              >
                {qty} kg
              </button>
            ))
          )}
        </div>
      )}

      <button onClick={handleButtonClick} className="mt-3 w-full animated-gradient-btn text-white py-2.5 rounded-lg font-semibold">
        Add to Cart
      </button>

      <button
        onClick={() => navigate(`/product/${item._id}`)}
        className="block mt-2 text-sm text-rose-700 underline underline-offset-2"
      >
        View Details
      </button>

      {showNotes && openNote && <NotesModal onClose={() => setOpenNote(false)} onAdd={handleAdd} />}
    </div>
  );
}
