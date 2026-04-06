import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/orders")
      .then((res) => {
        setError("");
        setOrders(res.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Failed to load analytics");
        setOrders([]);
      });
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const delivered = orders.filter((order) => order.status === "Delivered").length;
  const pending = orders.filter((order) => order.status === "Pending").length;

  const monthlyData = {};
  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("en-US", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + order.totalAmount;
  });

  const productCount = {};
  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      productCount[item.name] = (productCount[item.name] || 0) + (item.quantity || 1);
    });
  });

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto">
      <Link
        to="/admin/dashboard"
        className="bg-black text-white px-4 py-2 rounded inline-block mb-6"
      >
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded shadow">
          Total Orders
          <br />
          <b>{orders.length}</b>
        </div>
        <div className="bg-green-600 text-white p-4 rounded shadow">
          Revenue
          <br />
          <b>INR {totalRevenue}</b>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          Pending
          <br />
          <b>{pending}</b>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded shadow">
          Delivered
          <br />
          <b>{delivered}</b>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Monthly Sales</h2>
        <Bar
          data={{
            labels: Object.keys(monthlyData),
            datasets: [
              {
                label: "Revenue",
                data: Object.values(monthlyData),
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Best Selling Items</h2>
        <Pie
          data={{
            labels: Object.keys(productCount),
            datasets: [
              {
                data: Object.values(productCount),
                backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
