import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default instance;
