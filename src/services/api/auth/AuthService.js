import axios from "../../axios";

class AuthService {
  async signup(data) {
    const res = await axios.post("/signup", data);
    return res;
  }

  async singin(data) {
    const res = await axios.post("/login", data);
    return res;
  }

  async forgotPassword(email) {
    const res = await axios.post("/forgotPassword", { email });
    return res;
  }

  async resetPassword(token, data) {
    const res = await axios.post(`/resetPassword/${token}`, data);
    return res;
  }
}

export const authService = new AuthService();
