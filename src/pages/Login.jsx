import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosClient";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Login() {
  const ADMIN_EMAILS = ["admin@rms.com", "owner@rms.com"];
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const onChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const normalizeEmail = (email) => (email || "").toLowerCase().trim();

  const postWithFallback = async (paths, payload) => {
    let lastError = null;
    for (const path of paths) {
      try {
        return await api.post(path, payload);
      } catch (error) {
        lastError = error;
        if (error?.response?.status !== 404) throw error;
      }
    }
    throw lastError;
  };

  const submit = async () => {
    try {
      setLoading(true);
      const email = normalizeEmail(form.email);

      if (mode === "signup") {
        if (ADMIN_EMAILS.includes(email)) {
          setMode("login");
          alert("This email cannot be created in Sign Up. Please use Login with this email.");
          return;
        }

        const { data } = await postWithFallback(["/users/signup", "/users/register"], {
          name: form.name,
          mobile: form.mobile,
          email,
          password: form.password,
        });
        login({ token: data.token, user: data.user, role: "user" });
        navigate("/products");
        return;
      }

      if (mode === "login") {
        if (ADMIN_EMAILS.includes(email)) {
          const { data } = await api.post("/admin/login", {
            email,
            password: form.password,
          });
          login({ token: data.token, user: data.admin, role: "admin" });
          navigate("/admin/dashboard");
          return;
        }

        const { data } = await postWithFallback(["/users/login", "/users/signin"], {
          email,
          password: form.password,
        });
        login({ token: data.token, user: data.user, role: "user" });
        navigate("/products");
        return;
      }

      await postWithFallback(["/users/reset-password", "/users/forgot-password"], {
        email,
        mobile: form.mobile,
        newPassword: form.newPassword,
      });
      alert("Password reset successful. Please login.");
      setMode("login");
    } catch (error) {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;

      if (status === 404) {
        alert("Account service is not available on backend yet. Please redeploy backend and try again.");
        return;
      }

      alert(serverMessage || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-4 pb-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-bold text-center mb-1">User Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Login using your email ID to place orders.</p>

        <div className="grid grid-cols-3 gap-2 mb-5 text-sm">
          <button
            className={`py-2 rounded ${mode === "login" ? "bg-teal-700 text-white" : "bg-gray-100"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded ${mode === "signup" ? "bg-teal-700 text-white" : "bg-gray-100"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={`py-2 rounded ${mode === "reset" ? "bg-teal-700 text-white" : "bg-gray-100"}`}
            onClick={() => setMode("reset")}
          >
            Reset
          </button>
        </div>

        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 w-full rounded mb-3"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="border p-3 w-full rounded mb-3"
              value={form.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email ID"
          className="border p-3 w-full rounded mb-3"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        {mode === "reset" ? (
          <>
            <input
              type="tel"
              placeholder="Mobile (optional)"
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
        ) : (
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-3 w-full rounded mb-4"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
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
          onClick={submit}
          disabled={loading}
          className="bg-teal-700 text-white py-3 w-full rounded hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? <Loader label="Please wait..." compact inverse />
            : mode === "signup"
              ? "Create Account"
              : mode === "reset"
                ? "Reset Password"
                : "Login"}
        </button>

      </div>
    </div>
  );
}
