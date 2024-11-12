import { fontAwesomeIcons, sideBarItems } from "@utils/staticData";
import "./sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const markAsActive = (link) => link === location.pathname;
  const navigateLink = (link) => navigate(link);

  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sideBarItems.map((data) => {
            const IconComponent = fontAwesomeIcons[data.iconName];
            return (
              <li key={data.index} onClick={() => navigateLink(data.url)}>
                <div
                  className={`sidebar-link ${
                    markAsActive(data.url) && "active"
                  }`}
                >
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
