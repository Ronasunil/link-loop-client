import { postService } from "@api/post/PostService";
import { addPostValues } from "@rtk/slice/post/postSlice";
import { staticService } from "./staticService";
import store from "@rtk/store";
import { changePost } from "@rtk/slice/allPost/allPostSlice";

class PostUtils {
  #getPostData(postData, userData) {
    const { privacy, feelings, gifUrl, image, content } = postData;
    const baseData = { feelings, privacy, profilePic: userData.profileImg };

    let reqData = {};
    let createPostFn = null;

    if (!postData.gifUrl && !postData.image) {
      reqData = { ...baseData, bgColor: postData.bgColor || "#ffffff", content };
      createPostFn = postService.createPost;
    } else if (postData.gifUrl) {
      reqData = { ...baseData, gifUrl, image: "", content, bgColor: "#ffffff" };
      createPostFn = postService.createPostWithImage;
    } else if (postData.image) {
      reqData = { ...baseData, gifUrl: "", image, content, bgColor: "#ffffff" };
      createPostFn = postService.createPostWithImage;
    }
    return { reqData, createPostFn };
  }
  async createPost(postData, userData, dispatch) {
    try {
      const { createPostFn, reqData } = this.#getPostData(postData, userData);

      dispatch(addPostValues({ isLoading: true }));
      console.log(reqData);
      console.log(await createPostFn(reqData));
    } catch (err) {
      dispatch(addPostValues({ isLoading: false }));
      console.log(err);
    } finally {
      dispatch(addPostValues({ isLoading: false }));
    }
  }

  async editPost(post) {
    const filteredPost = staticService.filterObject(post);
    const postId = filteredPost.postId;
    delete filteredPost.postId;
    delete filteredPost.image;
    delete filteredPost.bgColor;

    await postService.editPost(postId, filteredPost);

    const { data } = await postService.getPostByPostId(postId);
    store.dispatch(changePost({ postId: data.post._id, newPost: data.post }));
  }

  async getPosts(page = 1) {
    try {
      const res = await postService.getAllPosts(page);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  checkPrivacy(post, userId, followersList) {
    const isPrivate = post.privacy === "Private" && post._id === userId;
    const isPublic = post.privacy === "Public";
    const forFollowers = post.privacy === "Followers" && staticService.checkUserIsFollowed(followersList, userId);

    return isPrivate || isPublic || forFollowers;
  }
}

export const postUtils = new PostUtils();
