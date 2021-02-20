import axios from "axios";

const token =
  localStorage.getItem("token") || localStorage.getItem("tempToken");

const http = axios.create({
  headers: { "x-token": token },
});

const defaultHeader = () => {
  http.interceptors.request.use(
    function (config) {
      const token =
        localStorage.getItem("token") || localStorage.getItem("tempToken");
      if (token) {
        config.headers["x-token"] = token;
      }
      return config;
    },
    function (error) {
      throw error;
    }
  );
};

export default {
  defaultHeader,
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};
