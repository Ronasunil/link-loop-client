import { fontAwesomeIcons, sideBarItems } from "@utils/staticData";
import "./sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const markAsActive = (link) => link === location.pathname;

  const user = useSelector((state) => state.user.profile);

  const navigateToLink = function (url) {
    const redirectingUrl = url === "/app/profile" ? `profile/${user._id}` : url;
    navigate(redirectingUrl);
  };
  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sideBarItems.map((data) => {
            const IconComponent = fontAwesomeIcons[data.iconName];
            return (
              <li key={data.index} onClick={() => navigateToLink(data.url)}>
                <div className={`sidebar-link ${markAsActive(data.url) && "active"}`}>
                  <div className="menu-icon">
                    <IconComponent className="icon" />
                  </div>
                  <div className="menu-link">
                    <span>{`${data.name}`}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
