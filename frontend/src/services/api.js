import axios from "axios";

const api = axios.create({
  baseURL: "https://optimess-backend.onrender.com/api"
});

export default api;