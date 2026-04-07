import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-rose-600 mb-4">404</h1>
      <p className="text-xl text-slate-700 mb-6">Page Not Found</p>

      <Link
        to="/"
        className="animated-gradient-btn text-white px-6 py-3 rounded-xl font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
}
