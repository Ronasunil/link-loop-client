import axios from "@services/axios";

class UserService {
  async getAllUsers(page) {
    return await axios.get(`/users?page=${page}`);
  }
}

export const userService = await new UserService();
