import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const parseStoredAuth = () => {
  try {
    const token = localStorage.getItem("rms_token");
    const userRaw = localStorage.getItem("rms_user");
    const role = localStorage.getItem("rms_role");
    const user = userRaw ? JSON.parse(userRaw) : null;
    return { token, user, role };
  } catch (error) {
    return { token: null, user: null, role: null };
  }
};

export function AuthProvider({ children }) {
  const initial = parseStoredAuth();
  const [token, setToken] = useState(initial.token);
  const [user, setUser] = useState(initial.user);
  const [role, setRole] = useState(initial.role);

  const login = ({ token: newToken, user: nextUser, role: nextRole }) => {
    setToken(newToken);
    setUser(nextUser);
    setRole(nextRole);

    localStorage.setItem("rms_token", newToken);
    localStorage.setItem("rms_user", JSON.stringify(nextUser));
    localStorage.setItem("rms_role", nextRole);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("rms_token");
    localStorage.removeItem("rms_user");
    localStorage.removeItem("rms_role");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isLoggedIn: Boolean(token),
      isAdmin: role === "admin",
      isUser: role === "user",
      login,
      logout,
    }),
    [token, user, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

