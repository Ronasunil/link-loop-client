import { Link } from "react-router-dom";

import Input from "@components/input/Input";
import "./forgetPassword.scss";
import Button from "@components/button/Button";
import { useState } from "react";
import { authService } from "@api/auth/AuthService";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgInfo, setMsgInfo] = useState({ msg: "", alertName: "" });
  const handleForgotPassword = async function (e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await authService.forgotPassword(email);
      setMsgInfo({ msg: res.data.message, alertName: "alert-success" });
    } catch (err) {
      setMsgInfo({
        msg: err.response.data[0].message,
        alertName: "alert-error",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container-wrapper">
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {msgInfo.msg && (
                  <div className={`alerts ${msgInfo.alertName}`} role="alert">
                    {msgInfo.msg}
                  </div>
                )}
                <form
                  onSubmit={handleForgotPassword}
                  className="forgot-password-form"
                >
                  <div className="form-input-container">
                    <Input
                      placeholder="sample@email.com"
                      label="email"
                      id="email"
                      labelText="Email"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <Button
                    disabled={isLoading || !email}
                    className="auth-button button"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                  <Link to="/" className="forgot-password-text">
                    Back to login?
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

export default ForgetPassword;
