import axios from "axios";
import {auth} from "./firebase"
const api= axios.create({
  baseURL: "http://3.109.52.204/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async config => {
    console.log("request interceptor in work");
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
export default api;