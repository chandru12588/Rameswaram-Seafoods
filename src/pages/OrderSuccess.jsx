import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function OrderSuccess(){
  const { id } = useParams();
  const { state } = useLocation();
  const [order, setOrder] = useState(state || null);

  const backend = "https://rms-backend-44od.onrender.com"; // 🔥 Production base URL

  // Load order if page refreshed
  useEffect(() => {
    if (!order) {
      const saved = JSON.parse(localStorage.getItem("latestOrder"));
      setOrder(saved);
    }
  }, []);

  // Auto WhatsApp message when order is available
  useEffect(() => {
    if(order) sendWhatsApp();
  }, [order]);

  const downloadInvoice = () => {
    window.open(`${backend}/api/orders/invoice/download/${id}`, "_blank");
  };

  const sendWhatsApp = () => {
    const data = order || JSON.parse(localStorage.getItem("latestOrder"));
    if (!data) return;

    const owner = "919655244550"; // WhatsApp Number without + symbol

    const msg = `📦 *New Order Received!*
─────────────────────
🧾 *Order ID:* ${id}

👤 ${data.name}
📞 ${data.phone}
📍 ${data.address}

🍤 *Items Ordered:*  
${data.items.map(i => 
`• ${i.name} × ${i.quantity}${i.unit ? ` ${i.unit}` : ""} - ₹${i.price * i.quantity}`
).join("\n")}

💰 *Total Amount:* ₹${data.total}
📝 Note: ${data.note || "No special request"}
─────────────────────
🙏 Thanks for ordering!
`;

    window.open(`https://wa.me/${owner}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return(
    <div className="pt-32 text-center p-6">
      <h1 className="text-3xl text-green-600 font-bold">🎉 Order Placed Successfully!</h1>
      <p className="mt-2 text-lg">Order ID: <b>{id}</b></p>

      <button 
        onClick={downloadInvoice}
        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded block mx-auto"
      >
        📄 Download Invoice
      </button>

      <Link to="/products" className="mt-6 inline-block text-teal-700 underline text-lg">
        Continue Shopping →
      </Link>
    </div>
  );
}
