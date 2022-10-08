import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Admin = () => {
  return (
    <div className="home">
      <Sidebar role="admin" />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
}

export default Admin;