import "./Auth.css";
import Logo from "../../assets/images/logo.png";
import Login from "./Login/Login";
import { useState } from "react";
import Register from "./Register/Register";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("login");
  return (
    <div className="Auth">
      <div className="mobileLogo">
        <div className="authLogo">
          <h1>PandaSocial</h1>
        </div>
      </div>
      <div className="authWrapper">
        <div className="authLeft">
          <div className="authLogo">
            <img src={Logo} alt="" />
            <h1>PandaSocial</h1>
          </div>
          <div className="authDesc">
            <h3>
              PandaSocial helps you connect and share with the people in your
              life.
            </h3>
          </div>
        </div>
        <div className="authRight">
          <div className="formWrapper">
            <div className="formHeader">
              <div
                className="loginDiv"
                style={{ backgroundColor: tab === "login" ? "black" : "" }}
                onClick={() => {
                  setTab("login");
                  dispatch({ type: "clearUsersError" });
                }}
              >
                <span style={{ color: "white" }}>LOGIN</span>
              </div>
              <div
                className="signupDiv"
                style={{ backgroundColor: tab === "signup" ? "black" : "" }}
                onClick={() => {
                  setTab("signup");
                  dispatch({ type: "clearUsersError" });
                }}
              >
                <span style={{ color: "white" }}>SIGNUP</span>
              </div>
            </div>
            <hr className="hrAuth" />
            <div className="formMain">
              {tab === "login" ? <Login /> : <Register />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
