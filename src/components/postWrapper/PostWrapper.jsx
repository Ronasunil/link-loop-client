import PropTypes from "prop-types";
import "./postWrapper.scss";

function PostWrapper({ children, closeModal }) {
  return (
    <div onClick={closeModal} className="modal-wrapper" data-testid="post-modal">
      {children}
      <div className="modal-bg"></div>
    </div>
  );
}

PostWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func,
};

export default PostWrapper;
