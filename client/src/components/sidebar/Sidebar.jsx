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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

const Sidebar = ({role}) => {

  // get user data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!role)
  {
    dispatch(removeData());
    navigate("/");
  }

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
          <p className="title">STATISTICS</p>
            <Link to="/statistics" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                {(role === "admin") && <span>Global Statistics</span>}
                {(role === "company") && <span>Statistics Of Your Persons</span>}
                {(role === "hospital") && <span>Statistics Of Your Patients</span>}
                {(role === "person" || role === "patient") && <span>Your Statistics</span>}
              </li>
            </Link>
          {(role === "admin" || role === "company" || role === "hospital") && <p className="title">USER</p>}
            {(role === "admin") && (
              <Link to="/admin/companies" style={{ textDecoration: "none" }}>
                <li>
                  <ApartmentIcon className="icon" />
                  <span>Companies</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital") && (
              <Link to="/hospital/patients" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Patients</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "company" || role === "hospital") && (
              <Link to="/persons" style={{ textDecoration: "none" }}>
                <li>
                  <PersonIcon className="icon" />
                  <span>Persons</span>
                </li>
              </Link>
            )}
            {(role === "admin" || role === "hospital") && (
            <Link to="/hospital/services" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Service</span>
              </li>
            </Link>
            )}
            {(role === "admin") && (
              <Link to="/admin/hospitals" style={{ textDecoration: "none" }}>
                <li>
                  <LocalHospitalIcon className="icon" />
                  <span>Hospitals</span>
                </li>
              </Link>
            )}
          <p className="title">Action</p>
          {(role === "admin" || role === "hospital") && (
            <Link to="/add-traitement" style={{ textDecoration: "none" }}>
              <li>
                <DataSaverOnIcon className="icon" />
                <span>Add Traitement</span>
              </li>
            </Link>
          )}
          {(role === "admin" || role === "company" || role === "hospital") && (
            <Link to="/create-account" style={{ textDecoration: "none" }}>
              <li>
                <PersonAddIcon className="icon" />
                {role === "hospital" &&<span>Add Patient/Person</span>}
                {role === "company" &&<span>Add Person</span>}
                {role === "admin" &&<span>Add User</span>}
              </li>
            </Link>
          )}
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