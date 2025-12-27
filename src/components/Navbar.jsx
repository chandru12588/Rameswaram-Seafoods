import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "../store/cartStore";

export default function Navbar() {
  const cart = useCart(s => s.cart);
  const toggleCart = useCart(s => s.toggleCart);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);
  }, []);

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    nav("/admin/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* ------- Logo ------- */}
        <div className="flex gap-3 items-center cursor-pointer" onClick={()=>nav("/")}>
          <img src="/logo.png" className="h-16" />
          <span className="hidden md:block text-2xl font-bold text-teal-700">Rameswaram Seafoods</span>
        </div>

        {/* ------- Desktop Menu ------- */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-lg font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>

            {!isAdmin ? (
              <Link to="/admin/login">Admin Login</Link>
            ) : (
              <>
                <Link to="/admin/dashboard">Dashboard</Link>
                <button onClick={logoutAdmin} className="text-red-600">Logout</button>
              </>
            )}
          </div>

          {/* ------- Cart Button ------- */}
          <button className="relative" onClick={toggleCart}>
            <ShoppingCartIcon className="h-8 text-teal-700"/>
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 bg-red-500 text-white px-2 rounded-full text-xs">
                {cart.length}
              </span>
            )}
          </button>

          {/* ------- Mobile toggle ------- */}
          <button className="md:hidden" onClick={()=>setOpen(!open)}>
            {open ? <XMarkIcon className="h-8"/> : <Bars3Icon className="h-8"/>}
          </button>
        </div>
      </div>

      {/* ------- Mobile Menu ------- */}
      {open && (
        <div className="md:hidden bg-white shadow">
          <Link onClick={()=>setOpen(false)} to="/" className="block p-3">Home</Link>
          <Link onClick={()=>setOpen(false)} to="/products" className="block p-3">Shop</Link>

          {!isAdmin ? (
            <Link onClick={()=>setOpen(false)} to="/admin/login" className="block p-3">Admin Login</Link>
          ) : (
            <>
              <Link onClick={()=>setOpen(false)} to="/admin/dashboard" className="block p-3">Dashboard</Link>
              <button onClick={logoutAdmin} className="block p-3 text-red-600 w-full text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
