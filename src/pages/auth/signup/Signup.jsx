import { useState } from "react";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { staticService } from "@utils/staticService";
import { authService } from "@api/auth/AuthService";

import "../signin/signin.scss";
function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgInfo, setMsgInfo] = useState({ msg: "", alertName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async function (e) {
    e.preventDefault();
    const avatarColor = staticService.generateRandomColor();
    const avatarImage = staticService.generateAvatarImg(userName[0]);
    const data = {
      userName,
      email,
      password,
      confirmPassword,
      avatarColor,
      avatarImage,
    };

    try {
      setIsLoading(true);
      console.log(data);
      const res = await authService.signup(data);
      setMsgInfo({ alertName: "alert-success", msg: res.data.message });
    } catch (err) {
      console.log(err.response);
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

      <form onSubmit={handleSignup} className="auth-form">
        <div className="form-input-container">
          <Input
            placeholder="Username"
            id="username"
            label="username"
            labelText="Username"
            name="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Email"
            id="email"
            label="email"
            labelText="Email"
            value={email}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Your password"
            id="password"
            label="password"
            value={password}
            labelText="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Your password"
            id="confirmPassword"
            label="confirmPassword"
            labelText="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </div>

        <Button
          disabled={
            !userName || !password || !confirmPassword || !email || isLoading
          }
          className="auth-button button"
        >
          {isLoading ? "Loading..." : "Signup"}
        </Button>
      </form>
    </div>
  );
}

export default Signup;
