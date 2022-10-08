import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeData } from "../../store";
import { useDispatch } from "react-redux";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';


const Sidebar = ({role}) => {

  // get user data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!role)
  {
    console.log("role is undefined");
    dispatch(removeData());
    navigate("/");
  }

  console.log("role is " + role);

  const handleLogout = () => {
    dispatch(removeData());
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
          <p className="title">USERS</p>
            {(role === "admin" || role === "hospital") &&  (
              <Link to="/patients" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Patients</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "company") && (
              <>
                <Link to="/persons" style={{ textDecoration: "none" }}>
                  <li>
                    <PersonIcon className="icon" />
                    <span>Persons</span>
                  </li>
                </Link>
              </>
            )}
          <p className="title">STATISTICS</p>
            {(role === "admin") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <LocalHospitalIcon className="icon" />
                  <span>Hospitals</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "patient" || role === "person") && (
              <Link to="/statistics" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Your Statistics</span>
                </li>
              </Link>
            )}

            {(role === "admin") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <ApartmentIcon className="icon" />
                  <span>Companies</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Patients</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "company") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <PersonIcon className="icon" />
                  <span>Persons</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital" || role === "company") && (
            <Link to="/service-statistics" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Service</span>
              </li>
            </Link>
            )}
          {(role === "admin") && <p className="title">SEARCH</p>}
            {(role === "admin") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <LocalHospitalIcon className="icon" />
                  <span>Hospitals</span>
                </li>
              </Link>
            )}
            {(role === "admin") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <ApartmentIcon className="icon" />
                  <span>Companies</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Patients</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "company") && (
              <Link to="/service-statistics" style={{ textDecoration: "none" }}>
                <li>
                  <PersonIcon className="icon" />
                  <span>Persons</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital" || role === "company") && (
            <Link to="/service-statistics" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Service</span>
              </li>
            </Link>
            )}
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
