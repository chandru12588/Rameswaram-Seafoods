import React, { useState } from "react";
import { useCart } from "../store/cartStore";
import api from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const cart = useCart((s) => s.cart);
  const clearCart = useCart((s) => s.clearCart);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name:"", phone:"", address:"" });
  const [paymentMode, setPaymentMode] = useState("COD");

  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address)
      return alert("⚠ Please fill all customer details!");

    const orderData = {
      items: cart,
      customerName: form.name,
      customerMobile: form.phone,
      customerAddress: form.address,
      totalAmount: total,
      paymentMode
    };

    console.log("Sending Order:", orderData);

    try {
      const res = await api.post("/orders/create", orderData);
      const orderId = res.data.orderId;

      // Store order for WhatsApp Auto
      const finalOrder = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        items: cart,
        total: total
      };
      
      localStorage.setItem("latestOrder", JSON.stringify(finalOrder));

      // ================== UPI PAYMENT ==================
      if (paymentMode === "Online-UPI") {

        alert(
          `📌 Make UPI Payment:\n\n` +
          `UPI ID: 9655244550-1@okbizaxis\n` +
          `Amount: ₹${total}\n\n` +
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

      // ================== COD ==================
      clearCart();
      navigate(`/order-success/${orderId}`, { state: finalOrder });

    } catch (err) {
      console.log(err);
      alert("❌ Order Failed! Try Again.");
    }
  };

  return (
    <div className="pt-28 max-w-3xl mx-auto p-6 pb-20">

      {/* BACK button */}
      <button
        onClick={() => navigate("/products")}
        className="mb-5 text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-2"
      >
        ← Back to Shop
      </button>

      <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold mb-3">Order Summary</h3>

        {cart.map((item,i)=>(
          <div key={i} className="flex justify-between py-1 text-gray-700">
            <span>{item.name}</span>
            <span>₹{item.price} × {item.quantity||1}</span>
          </div>
        ))}

        <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Customer Details</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            placeholder="Full Name"
            className="border p-3 rounded w-full focus:ring ring-teal-300"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Phone Number"
            type="tel"
            className="border p-3 rounded w-full focus:ring ring-teal-300"
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />
        </div>

        <textarea
          placeholder="Full Delivery Address"
          rows="3"
          className="border p-3 rounded w-full mt-4 focus:ring ring-teal-300"
          onChange={(e)=>setForm({...form,address:e.target.value})}
        />
      </div>

      {/* Payment */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Payment Method</h3>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            checked={paymentMode==="COD"}
            onChange={()=>setPaymentMode("COD")}
          />
          Cash On Delivery
        </label>

        <label className="flex gap-2 items-center mt-3 cursor-pointer">
          <input
            type="radio"
            checked={paymentMode==="Online-UPI"}
            onChange={()=>setPaymentMode("Online-UPI")}
          />
          Online UPI (GPay / PhonePe)
        </label>
      </div>

      {/* Place Order */}
      <button
        onClick={placeOrder}
        className="mt-10 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold flex justify-center gap-2"
      >
        💳 Pay & Place Order
      </button>
    </div>
  );
}
