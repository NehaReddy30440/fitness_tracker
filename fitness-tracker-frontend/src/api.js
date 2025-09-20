// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", // only change this once for prod
  withCredentials: true
});

export default api;
