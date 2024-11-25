import { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@components/avatar/Avatar";
import PrivacyDropdown from "@components/privacyDropdown/PrivacyDropdown";
import useOutsideClick from "@hooks/useOutsideClick";
import { FaGlobe } from "react-icons/fa";
import { feelingsList } from "@utils/staticData";
import happy from "@assets/feelings/happy.jpg";

function ModalBoxContent() {
  const { profile } = useSelector((state) => state.user);
  const [isPrivacyTabOpen, setIsPrivacyTabOpen] = useOutsideClick(false);
  const [selectedItem, setSelectedItem] = useState({
    topText: "Public",
    subText: "Anyone on Chatty",
    icon: FaGlobe,
  });
  const { feelings } = useSelector((state) => state.post.post);
  const getFeelings = function () {
    return feelingsList.find((feeling) => feeling.name === feelings);
  };

  const feeling = getFeelings();
  return (
    <div className="modal-box-content" data-testid="modal-box-content">
      <div className="user-post-image" data-testid="box-avatar">
        <Avatar size={40} imgSrc={profile?.profileImg} />
      </div>
      <div className="modal-box-info">
        <h5 className="inline-title-display" data-testid="box-username">
          {profile.name}
        </h5>
        <p className="inline-display" data-testid="box-feeling">
          is feeling <img className="feeling-icon" src={feeling?.image || happy} alt="" />{" "}
          <span>{feeling?.name || "happy"}</span>
        </p>
        <div
          data-testid="box-text-display"
          className="time-text-display"
          onClick={() => setIsPrivacyTabOpen(!isPrivacyTabOpen)}
        >
          {<selectedItem.icon className="globe-icon globe" />}{" "}
          <div className="selected-item-text" data-testid="box-item-text">
            {selectedItem.topText}
          </div>
        </div>
        <div data-testid="box-text-display" className="time-text-display">
          <div>
            <PrivacyDropdown
              isActive={isPrivacyTabOpen}
              setSelectedItem={setSelectedItem}
              setPrivacyTabOpen={setIsPrivacyTabOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBoxContent;
