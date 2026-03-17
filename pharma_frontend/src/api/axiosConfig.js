import axios from "axios";

/**
 * Axios instance for API calls
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;