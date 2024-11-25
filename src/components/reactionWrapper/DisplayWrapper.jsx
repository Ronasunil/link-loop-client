import PropTypes from "prop-types";
import "./reactionWrapper.scss";

function DisplayWrapper({ children }) {
  return (
    <>
      <div className="modal-wrapper" data-testid="modal-wrapper">
        <div className="modal-wrapper-container">
          <div className="modal-wrapper-container-header">
            {children[0]}
            <button>X</button>
          </div>
          <hr />
          <div className="modal-wrapper-container-body" data-testid="modal-body">
            {children[1]}
          </div>
        </div>
        <div className="modal-bg" data-testid="modal-bg"></div>
      </div>
    </>
  );
}

DisplayWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DisplayWrapper;
