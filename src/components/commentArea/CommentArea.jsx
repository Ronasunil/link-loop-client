import { FaRegCommentAlt } from "react-icons/fa";
import Reactions from "@components/reaction/Reaction";
import { reactionsMap } from "@utils/staticData";
import like from "@assets/reactions/like.png";
import PropTypes from "prop-types";
import "./commentArea.scss";
import { useDispatch, useSelector } from "react-redux";

import { staticService } from "@utils/staticService";
import { changePost } from "@rtk/slice/allPost/allPostSlice";
import { postService } from "@api/post/PostService";
import { addReaction } from "@rtk/slice/reaction/reactionSlice";
import { reactionService } from "@api/reaction/ReactionService";

function CommentArea({ setIsCommentOpen, setReaction, post, reaction }) {
  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();
  const handleAddReaction = async function (reaction) {
    const postData = {
      profilePic: profile.profileImg,
      userName: profile.userName,
      postId: post._id,
      userTo: post.userId,
      reactionType: reaction,
    };
    const res = await reactionService.addReaction(postData);

    if (res.data.status !== "0K") return staticService.displayActivityNotification(`Can't add reaction`, "error");

    staticService.displayActivityNotification("Reaction addedd", "success");

    const postRes = await postService.getPostByPostId(post._id);
    const reactionRes = await reactionService.getReactionByPostId(post._id);

    dispatch(changePost({ postId: postData.postId, newPost: postRes.data.post }));
    dispatch(addReaction({ reactions: reactionRes.data.reactions }));
    setReaction((prevReaction) => (prevReaction === reaction ? "like" : reaction));
  };
  return (
    <div className="comment-area" data-testid="comment-area">
      <div className="like-icon reactions">
        <div className="likes-block">
          <div className="like likes-block-icons reaction-icon">
            <div
              onClick={() => handleAddReaction(reaction || "like")}
              className="reaction-display like"
              data-testid="selected-reaction"
            >
              <img className="reaction-img" src={reactionsMap[reaction] || like} alt="" />
              <span>{reaction || "like"}</span>
            </div>
            {/* <div className="reaction-display" data-testid="default-reaction">
                    <img className="reaction-img" src="" alt="" /> <span>Like</span>
                  </div> */}
          </div>
        </div>
        <div className="reactions-container app-reactions">
          <Reactions handleClick={handleAddReaction} />
        </div>
      </div>
      <div onClick={() => setIsCommentOpen((state) => !state)} className="comment-block">
        <span className="comments-text">
          <FaRegCommentAlt className="comment-alt" /> <span>Comments</span>
        </span>
      </div>
    </div>
  );
}

CommentArea.propTypes = {
  post: PropTypes.object,
  reaction: PropTypes.string,
  setReaction: PropTypes.func,
  setIsCommentOpen: PropTypes.func,
};

export default CommentArea;
