import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LOGO from '../../assets/LOGO.png';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeData } from "../../store";
import { useEffect } from "react";

const Navbar = () => {

  // get user from redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state?.data?.data?.user);
  let firstName = undefined;
  if (data?.role === "patient") firstName = data?.patient?.firstName;
  else if (data?.role === "person") firstName = data?.person?.firstName;
  else if (data?.role === "admin") firstName = data?.admin?.firstName;
  else if (data?.role === "hospital") firstName = data?.hospital?.firstName;
  else if (data?.role === "company") firstName = data?.company?.firstName;


  const handleLogout = () => {
    dispatch(removeData());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  // check if user logged in
  
  return (
    <div className="navbar">
      <div className="wrapper">
          <h3><span className="logo" style={{
            color: "#6439FF",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}>[ {data?.role.toUpperCase()} ]</span> Hello, {firstName !== undefined ? firstName : "there"}</h3>
        <div className="items">
          <div className="item">
            <img
              src={LOGO}
              alt=""
              className="avatar"
            />
          </div>
          <div className="item logOut"
            onClick={handleLogout}
          >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
