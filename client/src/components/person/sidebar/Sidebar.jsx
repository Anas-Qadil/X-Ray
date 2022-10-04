import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeData } from "../../../store";
import { useDispatch } from "react-redux";


const Sidebar = ({role}) => {

  // get user data
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data?.user);
  const navigate = useNavigate();
  if (!role || role !== "person") {
    console.log("role is undefined");
    dispatch(removeData());
    navigate("/");
  }

  const handleLogout = () => {
    dispatch(removeData());
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={(`/${role}`)} style={{ textDecoration: "none" }}>
          <span className="logo">X-Ray</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={`/${role}`} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/person/hospital-statistics" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hopitale</span>
            </li>
          </Link>
          <Link to="/person/service-statistics" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Service</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span
              onClick={() => {
                handleLogout();
              }}
            >Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
