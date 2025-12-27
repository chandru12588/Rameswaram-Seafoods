import React, { useState } from "react";
import api from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginAdmin = async () => {
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="pt-32 max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 w-full rounded mb-4 bg-blue-50"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password input with toggle */}
      <div className="relative mb-5">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="border p-3 w-full rounded bg-blue-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-600 hover:text-black"
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      </div>

      <button
        onClick={loginAdmin}
        className="bg-teal-700 text-white py-3 px-6 rounded w-full hover:bg-teal-800"
      >
        Login
      </button>
    </div>
  );
}
