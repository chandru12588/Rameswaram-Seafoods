import React from "react";
import { useCart } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cart, toggleCart, drawerOpen, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[999] p-4 md:p-5 transition-transform duration-300 border-l border-rose-100 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center border-b border-rose-100 pb-3">
        <h2 className="text-xl font-extrabold">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="inline-flex items-center gap-1.5 text-rose-700 font-semibold text-sm px-2.5 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
      </div>

      <div className="mt-4 space-y-3 max-h-[68vh] overflow-y-auto pr-1">
        {cart.length === 0 && <p className="text-slate-500 text-center mt-10">Cart is empty</p>}

        {cart.map((item) => (
          <div key={item._id} className="border border-rose-100 p-3 rounded-xl bg-rose-50/30">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="font-bold text-slate-800">{item.name}</p>
                <p className="text-sm text-slate-600 mt-0.5">Rs {item.price}/{item.unit || "qty"}</p>
              </div>

              <button onClick={() => removeFromCart(item._id)} className="text-rose-600 font-semibold text-sm">
                Remove
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2.5">
              <button onClick={() => decreaseQty(item._id)} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">
                -
              </button>
              <span className="text-sm font-semibold">
                {item.quantity || 1} {item.unit || "qty"}
              </span>
              <button onClick={() => increaseQty(item._id)} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between font-extrabold text-lg mb-3">
            <span>Total:</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              toggleCart();
              navigate("/checkout");
            }}
            className="w-full animated-gradient-btn text-white py-3 rounded-xl font-bold"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
