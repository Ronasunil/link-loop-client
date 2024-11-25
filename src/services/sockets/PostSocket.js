import store from "@rtk/store";
import Socket from "./Socket";
import { addPost } from "@rtk/slice/allPost/allPostSlice";

export default class PostSocket {
  constructor() {
    this.socket = new Socket().socket;
    this.setupEvents();
  }

  setupEvents() {
    this.socket.on("add post", (postData) => {
      console.log(postData);
      store.dispatch(addPost({ post: postData }));
    });
  }
}
