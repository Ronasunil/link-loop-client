import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { privacyList } from "@utils/staticData";
import { addPostValues } from "@rtk/slice/post/postSlice";

import "./privacyDropdown.scss";

const PrivacyDropdown = ({ isActive, setSelectedItem, setPrivacyTabOpen }) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const selectItem = (item) => {
    setSelectedItem({
      topText: item.topText,
      subText: item.subText,
      icon: item.icon,
    });
    setPrivacyTabOpen(false);
    dispatch(addPostValues({ privacy: item.topText.toLowerCase() }));
  };

  return (
    <div className="menu-container" data-testid="menu-container">
      <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
        <ul>
          {privacyList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li data-testid="select-dropdown" key={index} onClick={() => selectItem(item)}>
                <div className="menu-icon">
                  <IconComponent className="globe-icon globe" />
                </div>
                <div className="menu-text">
                  <div className="menu-text-header">{item.topText}</div>
                  <div className="sub-header">{item.subText}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

PrivacyDropdown.propTypes = {
  isActive: PropTypes.bool,
  setSelectedItem: PropTypes.func,
  setPrivacyTabOpen: PropTypes.func,
  items: PropTypes.array,
};

export default PrivacyDropdown;
