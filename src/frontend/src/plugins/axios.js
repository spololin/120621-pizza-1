import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => e.response
);

export default axiosInstance;
