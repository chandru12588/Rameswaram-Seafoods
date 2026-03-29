import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosClient";
import Loader from "../components/Loader";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((error) => alert(error?.response?.data?.message || "Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 p-4 md:p-6 max-w-7xl mx-auto">
      <Link to="/admin/dashboard" className="bg-black text-white px-4 py-2 rounded inline-block mb-4">
        Back to Dashboard
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Registered Users</h1>

      {loading ? (
        <Loader label="Loading users..." />
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Mobile</th>
                <th className="text-left p-3">Joined</th>
                <th className="text-left p-3">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.mobile || "-"}</td>
                  <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="p-3">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
