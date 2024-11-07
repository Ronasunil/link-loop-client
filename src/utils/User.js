import { createUser } from "@rtk/slice/user/userSlice";

class User {
  dispatchUser(data, dispatch) {
    console.log("data", data.user, data);
    dispatch(
      createUser({ token: data.token, profile: data.user, isLoggedIn: true })
    );
  }
}

export const user = new User();
