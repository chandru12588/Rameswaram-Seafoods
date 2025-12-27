import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ---------------- Admin Pages ---------------- */
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminProductList from "./admin/AdminProductList";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import Analytics from "./admin/Analytics";
import AdminOrderView from "./admin/AdminOrderView";   // 🔥 Added

/* ---------------- Customer Pages ---------------- */
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

/* ---------------- Components ---------------- */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  return (
    <Router>
      <Navbar />
      <CartDrawer />

      <div className="pt-24 min-h-screen bg-gray-50">
        <Routes>

          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/shop" element={<Shop />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/order/:id" element={<AdminOrderView />} /> {/* 🔥 View Page Route */}
          <Route path="/admin/analytics" element={<Analytics />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
