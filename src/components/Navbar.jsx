import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Squares2X2Icon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
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
    <nav className="fixed top-0 left-0 w-full nav-glass z-50">
      <div className="section-shell flex justify-between items-center px-2 py-3 md:px-1 md:py-3.5">
        <div className="flex gap-3 md:gap-4 items-center cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/logo.png"
            className="h-14 w-14 md:h-20 md:w-20 rounded-full object-contain bg-white p-1.5 ring-2 ring-rose-200 shadow-sm"
            alt="Logo"
          />
          <span className="hidden md:block text-[30px] lg:text-[34px] font-extrabold tracking-tight text-rose-700 leading-none">Rameswaram Seafoods</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex gap-5 text-[15px] font-medium items-center text-slate-800">
            <Link className="hover:text-rose-700 transition-colors inline-flex items-center gap-1.5" to="/products">
              <Squares2X2Icon className="h-5 w-5" />
              <span>Categories</span>
            </Link>
            <Link className="hover:text-rose-700 transition-colors inline-flex items-center gap-1.5" to="/">
              <BuildingStorefrontIcon className="h-5 w-5" />
              <span>Stores</span>
            </Link>
            <Link className="hover:text-rose-700 transition-colors inline-flex items-center gap-1.5" to="/products">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Lab Reports</span>
            </Link>
            {!isLoggedIn && (
              <Link className="hover:text-rose-700 transition-colors inline-flex items-center gap-1.5" to="/login">
                <UserCircleIcon className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}

            {isAdmin && <Link className="hover:text-rose-700 transition-colors" to="/admin/dashboard">Dashboard</Link>}

            {isLoggedIn && !isAdmin && <span className="text-xs text-slate-500 max-w-[170px] truncate">{user?.email}</span>}

            {isLoggedIn && (
              <button onClick={onLogout} className="text-rose-700 hover:text-rose-800 transition-colors">
                Logout
              </button>
            )}
          </div>

          {!isAdmin && (
            <button className="relative rounded-full p-2 bg-white shadow-sm border border-rose-100 hover:border-rose-300 transition inline-flex items-center gap-1.5 md:px-3" onClick={toggleCart}>
              <ShoppingCartIcon className="h-6 md:h-6 text-rose-700" />
              <span className="hidden md:inline text-sm font-medium text-slate-800">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 bg-rose-600 text-white min-w-5 h-5 px-1 rounded-full text-[11px] leading-5 font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          <button className="md:hidden rounded-lg p-1.5 border border-rose-100 bg-white" onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="h-7 text-rose-700" /> : <Bars3Icon className="h-7 text-rose-700" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-2 mb-2 rounded-xl border border-rose-100 bg-white/95 shadow-lg overflow-hidden fade-up">
          <Link onClick={() => setOpen(false)} to="/" className="block p-3.5 font-medium border-b border-rose-50">
            Stores
          </Link>
          <Link onClick={() => setOpen(false)} to="/products" className="block p-3.5 font-medium border-b border-rose-50">
            Categories
          </Link>
          <Link onClick={() => setOpen(false)} to="/products" className="block p-3.5 font-medium border-b border-rose-50">
            Lab Reports
          </Link>

          {!isLoggedIn && (
            <Link onClick={() => setOpen(false)} to="/login" className="block p-3.5 font-medium border-b border-rose-50">
              User Login / Sign Up
            </Link>
          )}

          {isAdmin && (
            <Link onClick={() => setOpen(false)} to="/admin/dashboard" className="block p-3.5 font-medium border-b border-rose-50">
              Dashboard
            </Link>
          )}

          {isLoggedIn && !isAdmin && <div className="px-3.5 py-2 text-xs text-slate-500 border-b border-rose-50">{user?.email}</div>}

          {isLoggedIn && (
            <button onClick={onLogout} className="block p-3.5 text-rose-700 w-full text-left font-semibold">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
