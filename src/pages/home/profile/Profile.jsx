import { useParams } from "react-router-dom";
import "./profile.scss";

function Profile() {
  const { userId } = useParams();

  return <div>{`profile page${userId}`}</div>;
}

export default Profile;
