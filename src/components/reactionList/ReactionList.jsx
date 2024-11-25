import Avatar from "@components/avatar/Avatar";
import { reactionsMap } from "@utils/staticData";

import "./reactionList.scss";
import { useSelector } from "react-redux";

function ReactionList() {
  const { reactions } = useSelector((state) => state.reactions);
  console.log(reactions);
  return (
    <div className="modal-reactions-container" data-testid="modal-reactions-container">
      {reactions?.map((reaction, i) => (
        <div className="modal-reactions-container-list" key={i} data-testid="reaction-list">
          <div className="img">
            <Avatar size={50} imgSrc={reaction?.profilePic} />
            <img src={`${reactionsMap[reaction?.reactionType]}`} alt="" className="reaction-icon" />
          </div>
          <span>{reaction?.userName}</span>
        </div>
      ))}
    </div>
  );
}

export default ReactionList;
