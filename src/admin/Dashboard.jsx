import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="pt-24 p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/add-category" className="block bg-blue-500 hover:bg-blue-600 text-white p-3 rounded shadow">
          Add Category
        </Link>

        <Link to="/admin/add-product" className="block bg-green-500 hover:bg-green-600 text-white p-3 rounded shadow">
          Add Product
        </Link>

        <Link to="/admin/products" className="block bg-purple-500 hover:bg-purple-600 text-white p-3 rounded shadow">
          Product List
        </Link>

        <Link to="/admin/orders" className="block bg-red-500 hover:bg-red-600 text-white p-3 rounded shadow">
          Orders Panel
        </Link>

        <Link to="/admin/analytics" className="block bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded shadow">
          Analytics
        </Link>

        <Link to="/admin/users" className="block bg-orange-500 hover:bg-orange-600 text-white p-3 rounded shadow">
          Monitor Users
        </Link>

        <Link to="/admin/account" className="block bg-gray-700 hover:bg-gray-800 text-white p-3 rounded shadow sm:col-span-2">
          Change Password
        </Link>

        <button
          onClick={handleLogout}
          className="w-full bg-black hover:bg-gray-900 text-white p-3 rounded shadow text-center sm:col-span-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
