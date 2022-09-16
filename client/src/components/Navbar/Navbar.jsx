import "./Navbar.css";
import {
  Home,
  HomeOutlined,
  SettingsOutlined,
  NotificationsOutlined,
  TextsmsOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [setIsHome]);
  return (
    <div className="Navbar">
      <div
        className="hum"
        onClick={() => dispatch({ type: "clearSearchActive" })}
      >
        <Link to={"/"} className="navLogo">
          {isHome ? (
            <Home style={{ color: "var(--primary-color)" }} />
          ) : (
            <HomeOutlined />
          )}
        </Link>
      </div>
      <span className="navLogo">
        <SettingsOutlined style={{ color: "black" }} />
      </span>
      <span className="navLogo">
        <NotificationsOutlined style={{ color: "black" }} />
      </span>
      <Link to={"/messanger"} className="navLogo">
        <TextsmsOutlined style={{ color: "black" }} />
      </Link>
    </div>
  );
};

export default Navbar;
