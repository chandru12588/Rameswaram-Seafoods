import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminProductList from "./admin/AdminProductList";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import Analytics from "./admin/Analytics";
import AdminOrderView from "./admin/AdminOrderView";
import AdminLogin from "./admin/AdminLogin";
import AdminUsers from "./admin/AdminUsers";
import AdminAccount from "./admin/AdminAccount";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { useAuth } from "./context/AuthContext";

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}

function UserRoute({ children }) {
  const { isUser } = useAuth();
  if (!isUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <CartDrawer />

      <div className="pt-24 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/checkout"
            element={
              <UserRoute>
                <Checkout />
              </UserRoute>
            }
          />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/shop" element={<Shop />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProductList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <AdminRoute>
                <AdminOrderView />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/account"
            element={
              <AdminRoute>
                <AdminAccount />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
