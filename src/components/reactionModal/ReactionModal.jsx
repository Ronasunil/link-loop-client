import { forwardRef } from "react";
import PropTypes from "prop-types";

import DisplayWrapper from "@components/reactionWrapper/DisplayWrapper";
import ReactionList from "@components/reactionList/ReactionList";

import "./reactionModal.scss";

const ReactionsModal = forwardRef(({ isOpen }, ref) => {
  return (
    <>
      {isOpen && (
        <DisplayWrapper>
          <div className="modal-reactions-header-tabs">
            <ul className="modal-reactions-header-tabs-list">
              <li className="all">All</li>
            </ul>
          </div>

          <div ref={ref} className="modal-reactions-list">
            <ReactionList />
          </div>
        </DisplayWrapper>
      )}
    </>
  );
});

ReactionsModal.displayName = "ReactionModal";
ReactionsModal.propTypes = {
  isOpen: PropTypes.bool,
};

export default ReactionsModal;
