import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axiosClient";
import Loader from "../components/Loader";

export default function AdminOrderView() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await api.get(`/orders/${id}`);
    setOrder(data);
  };

  if (!order) {
    return <Loader label="Loading order details..." />;
  }

  return (
    <div className="pt-28 p-6 max-w-3xl mx-auto">
      <Link to="/admin/orders" className="text-blue-600 underline mb-4 inline-block">
        Back to Orders
      </Link>

      <h2 className="text-3xl font-bold mb-5">Order Details</h2>

      <div className="border p-5 rounded bg-white shadow">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Name:</b> {order.customerName}</p>
        <p><b>Mobile:</b> {order.customerMobile}</p>
        <p><b>Address:</b> {order.customerAddress}</p>
        <p><b>Payment Mode:</b> {order.paymentMode}</p>
        <p><b>Total Amount:</b> INR {order.totalAmount}</p>
        <p><b>Date and Time:</b> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Ordered Items</h3>
      <ul className="bg-gray-100 p-4 rounded">
        {(order.items || []).map((item, index) => (
          <li key={index} className="py-1">- {item.name} x {item.quantity} - INR {item.price}</li>
        ))}
      </ul>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/919655244550?text=*New Order*%0A%0A*Order ID:* ${order._id}%0A*Name:* ${order.customerName}%0A*Mobile:* ${order.customerMobile}%0A*Address:* ${order.customerAddress}%0A%0A${(order.items || []).map((item) => `- ${item.name} x ${item.quantity}`).join("%0A")}%0A%0A*Total:* INR ${order.totalAmount}`}
        className="mt-5 bg-green-600 text-white px-6 py-2 rounded inline-block"
      >
        Send to WhatsApp
      </a>
    </div>
  );
}
