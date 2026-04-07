import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  const { state } = useLocation();
  const [order, setOrder] = useState(state || null);

  const backend = "https://rms-backend-44od.onrender.com";

  useEffect(() => {
    if (!order) {
      const saved = JSON.parse(localStorage.getItem("latestOrder"));
      if (saved) setOrder(saved);
    }
  }, [order]);

  useEffect(() => {
    if (order) {
      const key = `owner_notified_${id}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        sendWhatsApp(true);
      }
    }
  }, [order, id]);

  const downloadInvoice = () => {
    window.open(`${backend}/api/orders/invoice/download/${id}`, "_blank");
  };

  const sendWhatsApp = (autoRoute = false) => {
    const data = order || JSON.parse(localStorage.getItem("latestOrder"));
    if (!data) return;

    const owner = "919655244550";
    const paymentMode =
      data.paymentMode === "Online-UPI" || data.paymentMode === "UPI"
        ? "Online Payment (UPI)"
        : "Cash On Delivery";
    const paymentStatus =
      data.paymentMode === "Online-UPI" || data.paymentMode === "UPI"
        ? "Paid"
        : (data.paymentStatus || "Pending");
    const subtotal = data.subtotal || 0;
    const cleaningCharge = data.cleaningCharge || 0;
    const deliveryCharge = data.deliveryCharge || 20;

    const msg = `New Order Received\n------------------------------\nOrder ID: ${id}\n\nCustomer: ${data.name}\nMobile: ${data.phone}\nAddress: ${data.address}\n\nItems:\n${data.items
      .map(
        (i) => `- ${i.name} x ${i.quantity || i.qty || 1} ${i.unit || ""}\n  Rs ${(i.quantity || i.qty || 1) * i.price}\n  Note: ${
          i.note || "No special request"
        }`
      )
      .join("\n\n")}\n\nPayment Mode: ${paymentMode}\nPayment Status: ${paymentStatus}\nSubtotal: Rs ${subtotal}\nCut and Cleaning Charge: Rs ${cleaningCharge}\nDelivery Charge: Rs ${deliveryCharge}\nTotal Amount: Rs ${data.total}\n------------------------------\nPlease confirm this order.`;

    const whatsappUrl = `https://wa.me/${owner}?text=${encodeURIComponent(msg)}`;
    if (autoRoute) {
      window.location.href = whatsappUrl;
      return;
    }
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-32 px-4 pb-10 section-shell max-w-2xl">
      <div className="premium-card p-6 md:p-8 text-center">
        <h1 className="text-3xl md:text-4xl text-green-600 font-extrabold">Order Placed Successfully!</h1>
        <p className="mt-2 text-lg">Order ID: <b>{id}</b></p>

        <button
          onClick={downloadInvoice}
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2.5 rounded-lg block mx-auto font-semibold"
        >
          Download Invoice
        </button>

        <button
          onClick={() => sendWhatsApp(false)}
          className="mt-3 bg-green-600 hover:bg-green-700 transition text-white px-6 py-2.5 rounded-lg block mx-auto font-semibold"
        >
          Send WhatsApp Confirmation
        </button>

        <Link to="/products" className="mt-6 inline-block text-rose-700 underline text-lg font-semibold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
