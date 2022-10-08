import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Hospital = () => {
  return (
    <div className="home">
      <Sidebar role="hospital" />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
}

export default Hospital;