import PropTypes from "prop-types";
import "./reactionCommetnDiplay.scss";

import { useDispatch, useSelector } from "react-redux";
import { addReaction } from "@rtk/slice/reaction/reactionSlice";
import { reactionService } from "@api/reaction/ReactionService";
import { commentService } from "@api/comment/CommentService";
import { addComment } from "@rtk/slice/comment/commentSlice";

function ReactionCommentDisplay({ setIsCommentModalOpen, post, setIsOpen, isReacted }) {
  const dispatch = useDispatch();
  const { reactions } = useSelector((state) => state.reactions);

  const handleReactionModalOpen = async function () {
    setIsOpen(true);
    const res = await reactionService.getReactionByPostId(post._id);
    console.log(res);
    dispatch(addReaction({ reactions: res.data.reactions }));
  };

  const handleCommentModalOpen = async function () {
    setIsCommentModalOpen(true);
    const { data } = await commentService.getCommentByPostId(post._id);
    dispatch(addComment({ comments: data.comments }));
  };

  const getReactionMessage = () => {
    if (post.totalReaction === 0) return "";
    if (post.totalReaction === 1 && isReacted) return "You reacted";
    if (post.totalReaction === 1) return `${reactions[0]?.userName} reacted`;
    if (isReacted) return `You and ${post.totalReaction} others reacted...`;
    return `${reactions[0]?.userName} and ${post.totalReaction} others reacted...`;
  };

  return (
    <div className="reactions-display">
      <div onClick={handleReactionModalOpen} className="reaction">
        <div className="likes-block">
          <div className="likes-block-icons reactions-icon-display">
            <div className="tooltip-container">
              <div className="tooltip-container-text tooltip-container-bottom" data-testid="reaction-tooltip">
                <p className="title"></p>
              </div>
            </div>
          </div>
          <span data-testid="reactions-count" className="tooltip-container reactions-count">
            {getReactionMessage()}
          </span>
        </div>
      </div>
      <div onClick={handleCommentModalOpen} className="comment tooltip-container" data-testid="comment-container">
        <span data-testid="comment-count">{post.totalComments} Comments</span>
      </div>
    </div>
  );
}
ReactionCommentDisplay.propTypes = {
  post: PropTypes.object,
  setIsOpen: PropTypes.func,
  isReacted: PropTypes.bool,
  setIsCommentModalOpen: PropTypes.func,
};

export default ReactionCommentDisplay;
