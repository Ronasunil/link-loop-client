import axios from "@services/axios";

class ReactionService {
  async checkPostIsReacted(postId, userId) {
    try {
      const res = await axios.get(`/post/reactions/${postId}/${userId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getReactionByPostId(postId) {
    try {
      const res = await axios.get(`/post/reactions/${postId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addReaction(data) {
    try {
      const res = axios.post("/posts/reaction", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export const reactionService = new ReactionService();
