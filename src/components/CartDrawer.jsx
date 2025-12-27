import React from "react";
import { useCart } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {

  const { cart, toggleCart, drawerOpen, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[999] p-4 transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={toggleCart} className="text-red-600 font-bold text-xl">×</button>
      </div>

      {/* Items */}
      <div className="mt-4 space-y-3 max-h-[65vh] overflow-y-auto">
        {cart.length === 0 && <p className="text-gray-500 text-center mt-10">Cart is Empty</p>}

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.price}</p>

              {/* Qty Controls */}
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => decreaseQty(item._id)} className="px-2 bg-gray-300 rounded">-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => increaseQty(item._id)} className="px-2 bg-gray-300 rounded">+</button>
              </div>
            </div>

            <button onClick={() => removeFromCart(item._id)} className="text-red-500 font-semibold">Remove</button>
          </div>
        ))}
      </div>

      {/* Checkout button */}
      {cart.length > 0 && (
        <div className="absolute bottom-4 w-[90%]">
          <div className="flex justify-between font-bold text-lg mb-3">
            <span>Total:</span>
            <span>₹{subtotal}</span>
          </div>

          <button 
            onClick={() => { toggleCart(); navigate("/checkout"); }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold"
          >
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
