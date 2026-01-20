import axios from "axios";

const BASE_URL = import.meta.env.MODE === "production" ? "http://localhost:5001/api" : "/api";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
