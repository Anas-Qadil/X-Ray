import React from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from 'react-redux'
import Featured from "../../components/featured/Featured";

const Profile = ({role}) => {

  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  let userInfo;
  if (role === "admin")
    userInfo = user?.admin;
  if (role === "patient")
    userInfo = user?.patient;
  if (role === "person")
    userInfo = user?.person;
  if (role === "hospital")
    userInfo = user?.hospital;
  if (role === "company")
    userInfo = user?.company;

	return (
    <div className="home">
	    <Sidebar role={role} />
	    <div className="homeContainer">
        <div className="charts">
          <Featured user={userInfo} role={role} />
        </div>
      </div>
    </div>
  )
}

export default Profile