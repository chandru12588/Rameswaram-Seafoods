import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosClient";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function AdminAccount() {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changePassword = async () => {
    try {
      setLoading(true);
      await api.put("/admin/change-password", form);
      alert("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 p-4 md:p-6 max-w-xl mx-auto">
      <Link to="/admin/dashboard" className="bg-black text-white px-4 py-2 rounded inline-block mb-4">
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Account</h1>
        <p className="text-sm text-gray-600 mb-4">Logged in as: {user?.email}</p>

        <h2 className="font-semibold mb-2">Change Password</h2>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Current Password"
          className="border p-3 w-full rounded mb-3"
          value={form.currentPassword}
          onChange={(e) => setForm((s) => ({ ...s, currentPassword: e.target.value }))}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          className="border p-3 w-full rounded mb-3"
          value={form.newPassword}
          onChange={(e) => setForm((s) => ({ ...s, newPassword: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>
        <button
          onClick={changePassword}
          disabled={loading}
          className="bg-teal-700 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
          {loading ? <Loader label="Updating..." compact inverse /> : "Change Password"}
        </button>
      </div>
    </div>
  );
}
