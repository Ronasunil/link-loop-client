import CommentArea from "@components/commentArea/CommentArea";
import CommentInput from "@components/commentInput/CommentInput";
import ReactionCommentDisplay from "@components/reactionCommentDisplay/ReactionCommentDisplay";
import useOutsideClick from "@hooks/useOutsideClick";
import PropTypes from "prop-types";
import { useRef } from "react";

function PostCommentSection({ setIsCommentModalOpen, setReaction, isReacted, setIsOpen, post, reaction }) {
  const commentRef = useRef(null);
  const [isCommentOpen, setIsCommentOpen] = useOutsideClick(commentRef, false);
  return (
    <div data-testid="comment-section">
      <ReactionCommentDisplay
        setIsCommentModalOpen={setIsCommentModalOpen}
        isReacted={isReacted}
        setIsOpen={setIsOpen}
        post={post}
      />
      <CommentArea
        setIsCommentOpen={setIsCommentOpen}
        isReacted={isReacted}
        setReaction={setReaction}
        post={post}
        reaction={reaction}
      />
      <CommentInput setIsCommentOpen={setIsCommentOpen} post={post} isCommentOpen={isCommentOpen} />
    </div>
  );
}

PostCommentSection.propTypes = {
  post: PropTypes.object,
  isReacted: PropTypes.bool,
  reaction: PropTypes.string,
  setReaction: PropTypes.func,
  setIsOpen: PropTypes.func,
  setIsCommentModalOpen: PropTypes.func,
};

export default PostCommentSection;
