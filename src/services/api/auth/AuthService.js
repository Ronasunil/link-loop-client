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

  async signout() {
    try {
      const res = await axios.delete("/signout");
      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async currentUser() {
    const res = await axios.get("/currentUser");
    return res;
  }
}

export const authService = new AuthService();
