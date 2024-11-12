import { Link, useParams } from "react-router-dom";

import Input from "@components/input/Input";
import Button from "@components/button/Button";
import "./resetPassword.scss";
import { useState } from "react";
import { authService } from "@api/auth/AuthService";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgInfo, setMsgInfo] = useState({ msg: "", alertName: "" });
  const { token } = useParams();

  const handleResetPassword = async function (e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = { confirmPassword, password };
      const res = await authService.resetPassword(token, data);
      setMsgInfo({ msg: res.data.message, alertName: "alert-success" });
    } catch (err) {
      setIsLoading(false);
      setMsgInfo({
        msg: err.response.data[0].message,
        alertName: "alert-error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container-wrapper">
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {msgInfo.msg && (
                  <div className={`alerts ${msgInfo.alertName}`} role="alert">
                    {msgInfo.msg}
                  </div>
                )}
                <form onSubmit={handleResetPassword} className="reset-password-form">
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      labelText="New Password"
                      placeholder="New Password"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                      }}
                      value={password}
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      value={confirmPassword}
                    />
                  </div>
                  <Button disabled={!password || !confirmPassword || isLoading} className="auth-button button">
                    {isLoading ? "Loading..." : "Reset password"}
                  </Button>

                  <Link to={"/"}>
                    <span className="login">Back to Login</span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
