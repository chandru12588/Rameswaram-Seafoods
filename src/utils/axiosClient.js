import axios from "axios";

const AUTH_PUBLIC_PATHS = [
  "/admin/login",
  "/admin/reset-password",
  "/users/login",
  "/users/signin",
  "/users/signup",
  "/users/register",
  "/users/reset-password",
  "/users/forgot-password",
];

const clearStoredSession = () => {
  localStorage.removeItem("rms_token");
  localStorage.removeItem("rms_user");
  localStorage.removeItem("rms_role");
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("rms_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";
    const isPublicAuthRequest = AUTH_PUBLIC_PATHS.some((path) =>
      requestUrl.includes(path)
    );

    if (status === 401 && !isPublicAuthRequest) {
      const hadSession = Boolean(localStorage.getItem("rms_token"));
      if (hadSession) {
        clearStoredSession();
      }

      const currentPath = window.location.pathname || "";
      const loginPath = currentPath.startsWith("/admin") ? "/admin/login" : "/login";
      if (currentPath !== loginPath) {
        window.location.replace(loginPath);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
