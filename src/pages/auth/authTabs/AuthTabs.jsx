import { useState } from "react";
import "./authTabs.scss";

import Signin from "@pages/auth/signin/Singin";
import Signup from "@pages/auth/signup/Signup";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthTabs() {
  const [type, setType] = useState("signIn");
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) return <Navigate to="/app/home" replace={true} />;

  return (
    <div className="container-wrapper">
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className={`tab ${type === "signIn" && "active"}`}>
                <button className="login" onClick={() => setType("signIn")}>
                  Sign In
                </button>
              </li>
              <li className={`tab ${type === "signUp" && "active"} `}>
                <button className="signup" onClick={() => setType("signUp")}>
                  Sign Up
                </button>
              </li>
            </ul>
            {type === "signIn" && (
              <div className="tab-item">
                <Signin />
              </div>
            )}
            {type === "signUp" && (
              <div className="tab-item">
                <Signup />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthTabs;
