import React from "react";
export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white p-6 text-center mt-10">
      <p className="font-semibold">Rameswaram Seafoods © {new Date().getFullYear()}</p>
      <p className="text-sm opacity-90">Fresh Seafoods Delivered Daily 🐟</p>
    </footer>
  );
}
