import { FaCircle, FaEye, FaRegCircle } from "react-icons/fa";

import Avatar from "@components/avatar/Avatar";
import { staticService } from "@utils/staticService";
import "./notifications.scss";
import { useSelector } from "react-redux";
import { notificationService } from "@api/notification/NotificationService";

function Notifications() {
  const { notifications } = useSelector((state) => state.notifications);
  return (
    <div className="notifications-container">
      <div className="notifications">Notifications</div>
      {notifications.length ? (
        <div className="notifications-box">
          {notifications.map((notification, index) => (
            <div className="notification-box" data-testid="notification-box" key={index}>
              <div className="notification-box-sub-card">
                <div className="notification-box-sub-card-media">
                  <div className="notification-box-sub-card-media-image-icon">
                    <Avatar imgSrc={notification?.userFrom?.profilePicture} />
                  </div>
                  <div className="notification-box-sub-card-media-body">
                    <h6 className="title">
                      {notification?.message}
                      <small
                        data-testid="subtitle"
                        className="subtitle"
                        onClick={() => notificationService.markAsRead(notification._id)}
                      >
                        <FaEye className="eye" />
                      </small>
                    </h6>
                    <div className="subtitle-body">
                      <small className="subtitle">
                        {!notification?.read ? <FaCircle className="icon" /> : <FaRegCircle className="icon" />}
                      </small>
                      <p className="subtext">{staticService.getTimeDifference(notification.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="empty-page" data-testid="empty-page">
          You have no notification
        </h3>
      )}
    </div>
  );
}

export default Notifications;
