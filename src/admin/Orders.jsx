import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setError("");
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load orders");
      setOrders([]);
    }
  };

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto">
      <Link
        to="/admin/dashboard"
        className="bg-black text-white px-4 py-2 rounded inline-block mb-4"
      >
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">Orders List</h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-scroll">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-700 text-white text-sm">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Items</th>
              <th className="p-2">Address</th>
              <th className="p-2">Total</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Date and Time</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border text-sm">
                <td className="p-2">{o._id}</td>
                <td className="p-2">{o.customerName}</td>
                <td className="p-2">{o.customerMobile}</td>

                <td className="p-2">
                  {(o.items || []).map((i, j) => (
                    <div key={j}>- {i.name} x {i.quantity}</div>
                  ))}
                </td>

                <td className="p-2">{o.customerAddress}</td>
                <td className="p-2 font-bold text-green-600">INR {o.totalAmount}</td>
                <td className="p-2">{o.paymentMode}</td>

                <td className="p-2">
                  {new Date(o.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-xs text-gray-600">
                    {new Date(o.createdAt).toLocaleTimeString()}
                  </span>
                </td>

                <td className="p-2 flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/admin/order/${o._id}`)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    View
                  </button>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs text-center"
                    href={`https://wa.me/919655244550?text=*New Order Received*%0A%0A*Order ID:* ${o._id}%0A*Name:* ${o.customerName}%0A*Mobile:* ${o.customerMobile}%0A*Address:* ${o.customerAddress}%0A%0A*Items:*%0A${(o.items || [])
                      .map((i) => `- ${i.name} x ${i.quantity}`)
                      .join("%0A")}%0A%0A*Total:* INR ${o.totalAmount}%0A`}
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}

            {!orders.length && !error && (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
