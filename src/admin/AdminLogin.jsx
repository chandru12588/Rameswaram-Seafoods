import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosClient";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: "",
    newPassword: "",
  });

  useEffect(() => {
    if (isAdmin) navigate("/admin/dashboard");
  }, [isAdmin, navigate]);

  const onChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "login") {
        const { data } = await api.post("/admin/login", {
          email: form.email,
          password: form.password,
        });
        login({ token: data.token, user: data.admin, role: "admin" });
        navigate("/admin/dashboard");
        return;
      }

      await api.post("/admin/reset-password", {
        email: form.email,
        mobile: form.mobile,
        newPassword: form.newPassword,
      });
      alert("Admin password reset successful. Please login.");
      setMode("login");
    } catch (error) {
      alert(error?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-4 pb-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-xs text-gray-600 text-center mb-4">Only authorized admin account can login.</p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <button
            className={`py-2 rounded ${mode === "login" ? "bg-teal-700 text-white" : "bg-gray-100"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded ${mode === "reset" ? "bg-teal-700 text-white" : "bg-gray-100"}`}
            onClick={() => setMode("reset")}
          >
            Reset Password
          </button>
        </div>

        <input
          type="email"
          placeholder="Admin Email"
          className="border p-3 w-full rounded mb-3"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        {mode === "login" ? (
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-3 w-full rounded mb-4"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        ) : (
          <>
            <input
              type="tel"
              placeholder="Registered Mobile (optional)"
              className="border p-3 w-full rounded mb-3"
              value={form.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="border p-3 w-full rounded mb-4"
              value={form.newPassword}
              onChange={(e) => onChange("newPassword", e.target.value)}
            />
          </>
        )}

        <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white py-3 w-full rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader label="Please wait..." compact inverse /> : mode === "login" ? "Login as Admin" : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
