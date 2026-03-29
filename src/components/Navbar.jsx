import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../store/cartStore";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const cart = useCart((s) => s.cart);
  const toggleCart = useCart((s) => s.toggleCart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isAdmin, isLoggedIn, logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3 md:p-4">
        <div className="flex gap-2 md:gap-3 items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo.png" className="h-12 md:h-16" alt="Logo" />
          <span className="hidden md:block text-2xl font-bold text-teal-700">Rameswaram Seafoods</span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex gap-5 text-base font-medium items-center">
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>

            {!isLoggedIn && <Link to="/login">User Login</Link>}

            {isAdmin && <Link to="/admin/dashboard">Dashboard</Link>}

            {isLoggedIn && !isAdmin && <span className="text-sm text-gray-600">{user?.email}</span>}

            {isLoggedIn && (
              <button onClick={onLogout} className="text-red-600">
                Logout
              </button>
            )}
          </div>

          {!isAdmin && (
            <button className="relative" onClick={toggleCart}>
              <ShoppingCartIcon className="h-8 text-teal-700" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 bg-red-500 text-white px-2 rounded-full text-xs">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="h-8" /> : <Bars3Icon className="h-8" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow">
          <Link onClick={() => setOpen(false)} to="/" className="block p-3">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/products" className="block p-3">
            Shop
          </Link>

          {!isLoggedIn && (
            <Link onClick={() => setOpen(false)} to="/login" className="block p-3">
              User Login / Sign Up
            </Link>
          )}

          {isAdmin && (
            <Link onClick={() => setOpen(false)} to="/admin/dashboard" className="block p-3">
              Dashboard
            </Link>
          )}

          {isLoggedIn && !isAdmin && <div className="px-3 pb-2 text-xs text-gray-600">{user?.email}</div>}

          {isLoggedIn && (
            <button onClick={onLogout} className="block p-3 text-red-600 w-full text-left">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
