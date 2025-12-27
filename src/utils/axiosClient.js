import axios from "axios";

const api = axios.create({
  baseURL: "https://rms-backend-44od.onrender.com/api" // <-- correct backend URL
});

export default api;
