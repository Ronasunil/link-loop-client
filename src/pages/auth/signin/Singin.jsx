import { Link } from "react-router-dom";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import "./signin.scss";
import { authService } from "@api/auth/AuthService";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgInfo, setMsgInfo] = useState({ msg: "", alertName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async function (e) {
    e.preventDefault();
    const data = { email, password };
    try {
      setIsLoading(true);
      const res = await authService.singin(data);
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
    <div className="auth-inner">
      {msgInfo.msg && (
        <div className={`alerts ${msgInfo.alertName}`} role="alert">
          {msgInfo.msg}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSignin}>
        <div className="form-input-container">
          <Input
            placeholder="Email"
            id="email"
            label="email"
            labelText="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            id="password"
            label="password"
            labelText="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <input id="checkbox" type="checkbox" name="checkbox" />
            Keep me signed in
          </label>
        </div>
        {/* button component */}
        <Button
          disabled={!email || !password || isLoading}
          className="auth-button button"
        >
          {isLoading ? "Loading..." : "Signin"}
        </Button>
        <Link to="/forget-password" className="forgot-password">
          Forgot password?
        </Link>
      </form>
    </div>
  );
}

export default Signin;
