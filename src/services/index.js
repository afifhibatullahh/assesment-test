import axios from "axios";

const instance = axios.create({
  // baseURL: "http://159.65.140.95:3001/api/",
  baseURL: "http://localhost:3001/api/",
});

instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
