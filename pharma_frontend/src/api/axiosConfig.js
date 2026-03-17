import axios from "axios";

/**
 * Axios instance for API calls
 */
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export default axiosInstance;