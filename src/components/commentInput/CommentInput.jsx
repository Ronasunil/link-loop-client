import { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import Input from "@components/input/Input";

import "./commentInput.scss";
import { commentService } from "@api/comment/CommentService";
import { staticService } from "@utils/staticService";
import { useDispatch } from "react-redux";
import { addPost, changePost } from "@rtk/slice/allPost/allPostSlice";
import { postService } from "@api/post/PostService";

const CommentInput = forwardRef(function CommentInput({ isCommentOpen, setIsCommentOpen, post }, ref) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async function (e) {
    e.preventDefault();
    const commentData = {
      userTo: post.userId,
      postId: post._id,
      comment,
      profilePic: post.profilePic,
    };

    const res = await commentService.createComment(commentData);
    if (res.statusText !== "OK") return staticService.displayActivityNotification(`Can't add comment`, "error");
    setIsCommentOpen(false);

    staticService.displayActivityNotification("Comment added", "success");

    const { data } = await postService.getPostByPostId(post._id);
    dispatch(changePost({ postId: data.post._id, newPost: data.post }));
  };
  return (
    isCommentOpen && (
      <div ref={ref} className="comment-container" data-testid="comment-input">
        <form className="comment-form" onSubmit={handleSubmit}>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            type="text"
            labelText=""
            className="comment-input"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    )
  );
});

CommentInput.propTypes = {
  isCommentOpen: PropTypes.bool,
  post: PropTypes.object,
  setIsCommentOpen: PropTypes.func,
};

export default CommentInput;
