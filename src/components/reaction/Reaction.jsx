import PropTypes from "prop-types";

import { reactionsMap } from "@utils/staticData";
import "./reaction.scss";

function Reactions({ handleClick, showLabel = true }) {
  const reactionList = ["like", "love", "wow", "happy", "sad", "angry"];

  return (
    <div className="reactions" data-testid="reactions">
      <ul>
        {reactionList.map((reaction, index) => (
          <li key={index} onClick={() => handleClick(reaction)} data-testid="reaction">
            {showLabel && <label>{reaction}</label>}
            <img src={reactionsMap[reaction]} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

Reactions.propTypes = {
  handleClick: PropTypes.func,
  showLabel: PropTypes.bool,
};

export default Reactions;
