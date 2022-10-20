import React from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from 'react-redux'
import Featured from "../../components/featured/Featured";
import "./single.scss";
import MaleLogo from "../../assets/male.png"
import FemaleLogo from "../../assets/female.png"
import OtherLogo from "../../assets/other.png"
import { useLocation } from "react-router-dom";

const Profile = ({role}) => {

  const token = useSelector(state => state?.data?.token);
  const userRDX = useSelector(state => state?.data?.data?.user);
  const location = useLocation();

  const locationData = location?.state?.data || {};
  
  // check if locationData is empty
  const isEmpty = Object.keys(locationData).length === 0 && locationData.constructor === Object;
  let user = {};
  if (!isEmpty) 
  user = locationData;
  else
  {
    user = {...userRDX}
    user.OwnRole = role;
  }
  console.log(user);

  console.log(user);
	return (
    <div className="home">
	    <Sidebar role={user.role} />
	    <div className="homeContainer">
        <div className="single">
          <div className="singleContainer">
            <div className="top">
              <div className="left">
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                { (user.OwnRole === "patient" || user.OwnRole === "person") && 
                  <div className="item" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div className="details">
                    <img
                      src={OtherLogo}
                      alt=""
                      className="itemImg"
                    />
                      <h1 className="itemTitle">{user.firstName + ' ' + user.lastName}</h1>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >First name :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.firstName}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >Last name :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.lastName}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "5rem",
                            marginLeft: "-2rem",
                          }}
                        >age :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.age}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >gender :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.gender}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >birthDate :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.birthDate}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >address :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.address}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >phone :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.phone}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >email :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >cin :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.cin}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >poids :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >{user.poids}</span>
                      </div>
                      { user.OwnRole === "person" &&
                        <div className="detailItem">
                          <span className="itemKey"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginRight: "2rem",
                              marginLeft: "-2rem",
                            }}
                          >secteur :</span>
                          <span className="itemValue" 
                          style={{ fontSize: "1.2rem" }}
                          >{user.secteur}</span>
                        </div>
                      }
                      { user.OwnRole === "person" &&
                        <div className="detailItem">
                          <span className="itemKey"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginRight: "2rem",
                              marginLeft: "-2rem",
                            }}
                          >fonction :</span>
                          <span className="itemValue" 
                          style={{ fontSize: "1.2rem" }}
                          >{user.fonction}</span>
                        </div>
                      }
                      {/* { user.OwnRole === "person" &&
                        <div className="detailItem">
                          <span className="itemKey"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginRight: "2rem",
                              marginLeft: "-2rem",
                            }}
                          >company :</span>
                          <span className="itemValue" 
                          style={{ fontSize: "1.2rem" }}
                          >{user.company || ""}</span>
                        </div>
                      } */}
                      { user.OwnRole === "person" &&
                        <div className="detailItem">
                          <span className="itemKey"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginRight: "2rem",
                              marginLeft: "-2rem",
                            }}
                          >Person Type :</span>
                          <span className="itemValue" 
                          style={{ fontSize: "1.2rem" }}
                          >{user.type}</span>
                        </div>
                      }
                      {/* { user.OwnRole === "patient" &&
                        <div className="detailItem">
                          <span className="itemKey"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginRight: "2rem",
                              marginLeft: "-2rem",
                            }}
                          >hospital :</span>
                          <span className="itemValue" 
                          style={{ fontSize: "1.2rem" }}
                          >janedoe@gmail.com</span>
                        </div>
                      } */}
                    </div>
                  </div>
                }
                { (user.OwnRole === "hospital" || user.OwnRole === "company") &&
                  <div className="item" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <div className="details">
                  <img
                    src={OtherLogo}
                    alt=""
                    className="itemImg"
                  />
                    <h1 className="itemTitle">Designation</h1>
                    {user.role === "hospital" && 
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >name :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >Hospital name</span>
                      </div>
                    }
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >designation :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >region :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >ville :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >phone :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >Email :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    {user.OwnRole === "hospital" && 
                      <div className="detailItem">
                        <span className="itemKey"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginRight: "2rem",
                            marginLeft: "-2rem",
                          }}
                        >statut :</span>
                        <span className="itemValue" 
                        style={{ fontSize: "1.2rem" }}
                        >janedoe@gmail.com</span>
                      </div>
                    }
                  </div>
                  </div>
                }
                { (user.OwnRole === "admin") &&
                  <div className="item" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <div className="details">
                  <img
                    src={OtherLogo}
                    alt=""
                    className="itemImg"
                  />
                    <h1 className="itemTitle">Jane Doe</h1>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >First name :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >Last name :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >CIN :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >Email :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "2rem",
                          marginLeft: "-2rem",
                        }}
                      >phone :</span>
                      <span className="itemValue" 
                      style={{ fontSize: "1.2rem" }}
                      >janedoe@gmail.com</span>
                    </div>
                  </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile