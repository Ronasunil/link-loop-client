import { useLocation, useNavigate } from "react-router-dom";

import Button from "@components/button/Button";
import "./error.scss";

function Error() {
  const location = useLocation();
  const naviagate = useNavigate();
  return (
    <div className="error-container">
      <h1 className="oops">OOPS!</h1>
      <h4 className="not-found">{`The Requested page${location.pathname} not found`}</h4>
      <Button className="button back-button" onClick={() => naviagate(-1)}>
        Back
      </Button>
    </div>
  );
}

export default Error;
