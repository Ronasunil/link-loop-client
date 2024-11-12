import { authService } from "@api/auth/AuthService";
import { createUser } from "@rtk/slice/user/userSlice";

class User {
  dispatchUser(data, dispatch) {
    dispatch(createUser({ token: data.token, profile: data.user, isLoggedIn: true }));
  }

  async getCurrentUser() {
    try {
      const { data } = await authService.currentUser();
      return { token: data.token, profile: data.user, isLoggedIn: true };
    } catch (err) {
      console.log(err);
      return { token: "", profile: {}, isLoggedIn: false };
    }
  }
}

export const user = new User();
