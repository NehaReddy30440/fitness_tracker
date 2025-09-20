// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1717/api", // only change this once for prod
  withCredentials: true
});

export default api;
