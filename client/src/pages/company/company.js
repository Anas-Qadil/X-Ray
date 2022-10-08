import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Company = () => {
  return (
    <div className="home">
      <Sidebar role="company" />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
}

export default Company;