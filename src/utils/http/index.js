import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
http.interceptors.request.use(
  (config) => {
    let token = window.localStorage.getItem("@token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    window.localStorage.removeItem("@token");
    return Promise.reject(error);
  }
);

export default http;
