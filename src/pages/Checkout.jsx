import { useState } from "react";
import { useCart } from "../store/cartStore";
import api from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CLEANING_CATEGORY_KEYWORDS = ["fish", "seafood", "meat", "chicken", "mutton", "prawn", "crab"];
const isCleaningCategory = (name = "") =>
  CLEANING_CATEGORY_KEYWORDS.some((keyword) => String(name).toLowerCase().includes(keyword));

export default function Checkout() {
  const cart = useCart((s) => s.cart);
  const clearCart = useCart((s) => s.clearCart);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.mobile || "",
    email: user?.email || "",
    address: "",
  });
  const [paymentMode, setPaymentMode] = useState("COD");

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const hasCleaningItem = cart.some((item) =>
    isCleaningCategory(item?.categoryName || item?.category || item?.categoryId?.name || "")
  );
  const cleaningCharge = hasCleaningItem ? 20 : 0;
  const deliveryCharge = 20;
  const total = subtotal + cleaningCharge + deliveryCharge;

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      return alert("Please fill all customer details");
    }

    const orderData = {
      items: cart.map((item) => ({
        ...item,
        whatsappNumber: item.whatsappNumber || "919655244550",
      })),
      customerName: form.name,
      customerMobile: form.phone,
      customerEmail: form.email,
      customerAddress: form.address,
      paymentMode,
    };

    try {
      const res = await api.post("/orders/create", orderData);
      const orderId = res.data.orderId;

      const finalOrder = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        items: cart,
        subtotal,
        cleaningCharge,
        deliveryCharge,
        total,
        paymentMode,
        paymentStatus: paymentMode === "Online-UPI" ? "Paid" : "Pending",
      };

      localStorage.setItem("latestOrder", JSON.stringify(finalOrder));

      if (paymentMode === "Online-UPI") {
        alert(
          `Make UPI Payment:\n\n` +
            `UPI ID: 9655244550-1@okbizaxis\n` +
            `Amount: Rs ${total}\n\n` +
            `After payment page will redirect`
        );

        const upiUrl = `upi://pay?pa=9655244550-1@okbizaxis&pn=RMS%20Seafoods&am=${total}&cu=INR`;
        window.location.href = upiUrl;

        setTimeout(() => {
          clearCart();
          navigate(`/order-success/${orderId}`, { state: finalOrder });
        }, 2000);
        return;
      }

      clearCart();
      navigate(`/order-success/${orderId}`, { state: finalOrder });
    } catch (err) {
      alert(err?.response?.data?.message || "Order Failed! Try Again.");
    }
  };

  return (
    <div className="pt-28 pb-20 section-shell max-w-4xl">
      <button
        onClick={() => navigate("/products")}
        className="mb-5 text-rose-700 hover:text-rose-800 font-semibold"
      >
        Back to Shop
      </button>

      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Checkout</h2>

      <div className="premium-card p-5 md:p-6">
        <h3 className="text-xl font-bold mb-3">Order Summary</h3>

        {cart.map((item, i) => (
          <div key={i} className="flex justify-between py-1.5 text-slate-700 gap-3 text-sm md:text-base">
            <span>{item.name}</span>
            <span className="font-semibold">Rs {item.price} x {item.quantity || 1} {item.unit || ""}</span>
          </div>
        ))}

        <div className="border-t border-rose-100 mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning Charge</span>
            <span>Rs {cleaningCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>Rs {deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-extrabold text-lg pt-1">
            <span>Total Amount</span>
            <span className="text-rose-700">Rs {total}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 premium-card p-5 md:p-6">
        <h3 className="text-xl font-bold mb-3">Customer Details</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            placeholder="Full Name"
            className="input-polish p-3 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone Number"
            type="tel"
            className="input-polish p-3 w-full"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <input
          placeholder="Email ID"
          className="input-polish p-3 w-full mt-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {!isLoggedIn && (
          <p className="text-xs text-slate-500 mt-1">Email is optional. You can order without email.</p>
        )}

        <textarea
          placeholder="Full Delivery Address"
          rows="3"
          className="input-polish p-3 w-full mt-4"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <div className="mt-8 premium-card p-5 md:p-6">
        <h3 className="text-xl font-bold mb-3">Payment Method</h3>

        <label className="flex gap-2 items-center cursor-pointer font-medium">
          <input type="radio" checked={paymentMode === "COD"} onChange={() => setPaymentMode("COD")} />
          Cash On Delivery
        </label>

        <label className="flex gap-2 items-center mt-3 cursor-pointer font-medium">
          <input
            type="radio"
            checked={paymentMode === "Online-UPI"}
            onChange={() => setPaymentMode("Online-UPI")}
          />
          Online UPI (GPay / PhonePe)
        </label>
      </div>

      <button
        onClick={placeOrder}
        className="mt-10 w-full animated-gradient-btn text-white py-3.5 rounded-xl text-lg font-bold"
      >
        Pay and Place Order
      </button>
    </div>
  );
}
