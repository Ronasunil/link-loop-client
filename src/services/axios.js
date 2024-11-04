import axios from "axios";

export default axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
