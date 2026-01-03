import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ---------------- Firebase ---------------- */
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

/* ---------------- Admin Pages ---------------- */
import Dashboard from "./admin/Dashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminProductList from "./admin/AdminProductList";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import Analytics from "./admin/Analytics";
import AdminOrderView from "./admin/AdminOrderView";

/* ---------------- Customer Pages ---------------- */
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

/* ---------------- Components ---------------- */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

const ADMIN_EMAIL = "owner@rms.com"; // ✅ admin email

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  // Prevent flicker before auth loads
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <CartDrawer />

      <div className="pt-24 min-h-screen bg-gray-50">
        <Routes>
          {/* ---------------- Customer Routes ---------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/shop" element={<Shop />} />

          {/* ---------------- Admin Routes (PROTECTED) ---------------- */}
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/add-category"
            element={isAdmin ? <AddCategory /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/add-product"
            element={isAdmin ? <AddProduct /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/products"
            element={isAdmin ? <AdminProductList /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={isAdmin ? <EditProduct /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/orders"
            element={isAdmin ? <Orders /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/order/:id"
            element={isAdmin ? <AdminOrderView /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/analytics"
            element={isAdmin ? <Analytics /> : <Navigate to="/" />}
          />

          {/* ---------------- 404 ---------------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
