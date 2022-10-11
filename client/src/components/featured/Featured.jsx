import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Avatar from '@mui/material/Avatar';

const Featured = ({user, role}) => {

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Profile</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart"
          style={{
            marginLeft: '55px',
          }}
        >
          <Avatar  sx={{ marginTop: 5, bgcolor: '#00A7E1' }}>
          </Avatar>
        </div>
        <p className="title">Votre profile informations</p>
        {(role === "person" || role === "patient") && (
          <>
            <div className="summary">
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>First name</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.firstName || ''}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Last name</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.lastName || ''}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Phone number</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.phone || ''}</div>
                </div>
              </div>
            </div>
            <br />
            <div className="summary">
              <div className="item">
                <div className="itemTitle"
                  style={{ fontWeight: "bold"}}
                >Gender</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.gender || ''}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Age</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.age || ''}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>CIN</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.cin || ''}</div>
                </div>
              </div>
            </div>
          </>
        )}
        {(role === "company" || role === "hospital") && (
          <>
            <div className="summary">
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Email</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.email || ''}</div>
                </div>
              </div>
              {role === "hospital" && (
                  <div className="item">
                    <div className="itemTitle" style={{ fontWeight: "bold"}}>Statut</div>
                      <div className="itemResult positive">
                      <div className="resultAmount">{user?.statut || ''}</div>
                    </div>
                  </div>
              )}
            </div>
            <br />
            <div className="summary">
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Designation</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.designation || ''}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle" style={{ fontWeight: "bold"}}>Region</div>
                  <div className="itemResult positive">
                  <div className="resultAmount">{user?.region || ''}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
