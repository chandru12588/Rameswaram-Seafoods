import React from "react";
import QRCode from "react-qr-code";
import { useNavigate, useLocation } from "react-router-dom";

export default function UPIPayment() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const amount = query.get("amount");
  const upi = query.get("upi");
  const upiLink = `upi://pay?pa=${upi}&pn=RMS%20Seafoods&am=${amount}&cu=INR`;

  return (
    <div className="p-10 text-center max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Scan & Pay via UPI</h2>

      <div className="bg-white p-5 inline-block shadow rounded">
        <QRCode value={upiLink} size={200} />
      </div>

      <p className="mt-4 text-lg font-semibold">Amount: ₹{amount}</p>
      <p className="text-gray-500">{upi}</p>

      <button onClick={()=>navigate(-1)} className="mt-6 bg-teal-600 text-white px-6 py-3 rounded">
        Back to Checkout
      </button>
    </div>
  );
}
