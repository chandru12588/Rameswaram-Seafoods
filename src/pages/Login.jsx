import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="pt-28 px-4 pb-12 relative overflow-hidden min-h-[78vh]">
      <div className="absolute -top-20 -left-20 h-52 w-52 rounded-full bg-rose-200/35 blur-2xl" />
      <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-orange-200/35 blur-2xl" />

      <div className="max-w-md mx-auto mb-3 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-rose-700 font-semibold text-sm px-3 py-2 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 transition"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-md mx-auto premium-card p-6 md:p-7 fade-up relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img
            src="/logo.png"
            alt="Rameswaram Seafoods"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-contain bg-white p-1.5 ring-2 ring-rose-200 shadow-sm"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-rose-700 tracking-tight leading-none">Rameswaram Seafoods</span>
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-1">User Account</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Login using your email ID to place orders.</p>

        <div className="grid grid-cols-3 gap-2 mb-5 text-sm bg-slate-100 p-1 rounded-xl">
          <button
            className={`py-2 rounded-lg font-semibold transition ${mode === "login" ? "animated-gradient-btn text-white" : "text-slate-600"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded-lg font-semibold transition ${mode === "signup" ? "animated-gradient-btn text-white" : "text-slate-600"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={`py-2 rounded-lg font-semibold transition ${mode === "reset" ? "animated-gradient-btn text-white" : "text-slate-600"}`}
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
              className="input-polish p-3 w-full mb-3"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="input-polish p-3 w-full mb-3"
              value={form.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email ID"
          className="input-polish p-3 w-full mb-3"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        {mode === "reset" ? (
          <>
            <input
              type="tel"
              placeholder="Mobile (optional)"
              className="input-polish p-3 w-full mb-3"
              value={form.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="input-polish p-3 w-full mb-4"
              value={form.newPassword}
              onChange={(e) => onChange("newPassword", e.target.value)}
            />
          </>
        ) : (
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-polish p-3 w-full mb-4"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        )}

        <label className="flex items-center gap-2 text-sm text-slate-600 mb-4">
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
          className="animated-gradient-btn text-white py-3 w-full rounded-xl disabled:opacity-60 disabled:cursor-not-allowed font-bold"
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
