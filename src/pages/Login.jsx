import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="border p-3 w-full rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="border p-3 w-full rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-teal-700 text-white py-3 w-full rounded hover:bg-teal-800 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
