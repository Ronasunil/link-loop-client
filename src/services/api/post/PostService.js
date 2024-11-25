import axios from "@services/axios";

class PostService {
  async createPost(body) {
    const res = await axios.post("/post", body);
    return res;
  }

  async createPostWithImage(body) {
    const res = await axios.post("post/image", body);
    return res;
  }

  async getAllPosts(page) {
    const res = await axios.get(`/posts?page=${page}`);
    return res;
  }

  async getPostByPostId(postId) {
    try {
      const res = await axios.get(`/posts/${postId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async editPost(postId, updatedData) {
    try {
      const res = await axios.patch(`/posts/${postId}`, updatedData);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deletePost(postId) {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export const postService = new PostService();
