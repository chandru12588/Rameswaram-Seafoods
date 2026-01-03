import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../store/cartStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "owner@rms.com"; // 🔴 YOUR ADMIN EMAIL

export default function Navbar() {
  const cart = useCart((s) => s.cart);
  const toggleCart = useCart((s) => s.toggleCart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const isAdmin = user?.email === ADMIN_EMAIL;

  // 🔥 Listen to Firebase login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" className="h-16" alt="Logo" />
          <span className="hidden md:block text-2xl font-bold text-teal-700">
            Rameswaram Seafoods
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-lg font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>

            {!user && <Link to="/login">Login</Link>}

            {isAdmin && <Link to="/admin/dashboard">Dashboard</Link>}

            {user && (
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            )}
          </div>

          {/* Cart */}
          <button className="relative" onClick={toggleCart}>
            <ShoppingCartIcon className="h-8 text-teal-700" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 bg-red-500 text-white px-2 rounded-full text-xs">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="h-8" /> : <Bars3Icon className="h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow">
          <Link onClick={() => setOpen(false)} to="/" className="block p-3">
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/products"
            className="block p-3"
          >
            Shop
          </Link>

          {!user && (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="block p-3"
            >
              Login
            </Link>
          )}

          {isAdmin && (
            <Link
              onClick={() => setOpen(false)}
              to="/admin/dashboard"
              className="block p-3"
            >
              Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="block p-3 text-red-600 w-full text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
