import { forwardRef } from "react";
import PropTypes from "prop-types";
import Avatar from "@components/avatar/Avatar";
import DisplayWrapper from "@components/reactionWrapper/DisplayWrapper";

import "./commentModal.scss";
import { useSelector } from "react-redux";

const CommentModal = forwardRef(function CommentModal({ isCommentModalOpen }, ref) {
  const { comments } = useSelector((state) => state.comment);

  return (
    isCommentModalOpen && (
      <DisplayWrapper>
        <div className="modal-comments-header">
          <h2>Comments</h2>
        </div>
        <div ref={ref} className="modal-comments-container">
          <ul className="modal-comments-container-list">
            {comments?.map((comment) => (
              <li className="modal-comments-container-list-item" key={comment?._id} data-testid="modal-list-item">
                <div className="modal-comments-container-list-item-display">
                  <div className="user-img">
                    <Avatar size={45} imgSrc={comment?.profilePic} />
                  </div>
                  <div className="modal-comments-container-list-item-display-block">
                    <div className="comment-data">
                      <h1>{comment?.userName}</h1>
                      <p>{comment?.comment}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DisplayWrapper>
    )
  );
});

CommentModal.propTypes = {
  isCommentModalOpen: PropTypes.bool,
};

export default CommentModal;
