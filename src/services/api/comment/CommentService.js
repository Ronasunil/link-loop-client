import axios from "@services/axios";

class CommentService {
  async createComment(data) {
    try {
      const res = await axios.post("/posts/comment", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getCommentByPostId(postId) {
    try {
      const res = await axios.get(`/posts/comment/${postId}`);

      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export const commentService = new CommentService();
