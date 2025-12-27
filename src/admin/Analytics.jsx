import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";   // <-- using global backend baseURL
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, 
  BarElement, ArcElement, Tooltip, Legend 
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log("Analytics Fetch Error:", err));
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const packed = orders.filter(o => o.status === "Packed").length;

  // Monthly revenue aggregation
  const monthlyData = {};
  orders.forEach(o => {
    const month = new Date(o.createdAt).toLocaleString("en-US", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + o.totalAmount;
  });

  // Best selling product count
  const productCount = {};
  orders.forEach(order => {
    order.items.forEach(i => {
      productCount[i.name] = (productCount[i.name] || 0) + (i.quantity || 1);
    });
  });

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto">

      {/* Back button */}
      <Link
        to="/admin/dashboard"
        className="bg-black text-white px-4 py-2 rounded inline-block mb-6"
      >
        ⬅ Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">📊 Analytics Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded shadow">Total Orders<br/><b>{orders.length}</b></div>
        <div className="bg-green-600 text-white p-4 rounded shadow">Revenue<br/><b>₹{totalRevenue}</b></div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">Pending<br/><b>{pending}</b></div>
        <div className="bg-purple-600 text-white p-4 rounded shadow">Delivered<br/><b>{delivered}</b></div>
      </div>

      {/* Monthly revenue graph */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">📅 Monthly Sales</h2>
        <Bar
          data={{
            labels: Object.keys(monthlyData),
            datasets:[{
              label:"Revenue",
              data:Object.values(monthlyData),
              backgroundColor:"rgba(75,192,192,0.6)"
            }]
          }}
        />
      </div>

      {/* Best selling products */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">🥇 Best Selling Items</h2>
        <Pie
          data={{
            labels:Object.keys(productCount),
            datasets:[{
              data:Object.values(productCount),
              backgroundColor:["#ff6384","#36a2eb","#ffcd56","#4bc0c0","#9966ff","#ff9f40"]
            }]
          }}
        />
      </div>
    </div>
  );
}
