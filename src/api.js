import axios from "axios";

const api= axios.create({
  baseURL: "http://3.109.52.204/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;