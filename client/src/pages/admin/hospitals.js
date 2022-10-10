import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField  } from '@mui/material';
import { useSelector } from 'react-redux'
import moment from "moment";
import Loader from "../../components/loader";
import { getHospitalServices } from "../../api/servicesApi";

const Hospitals = ({role}) => {


  const labels = ["Name", "Region", "Ville", "Statut", "Designation", "Phone", "Email", "Action"]

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
        <div className="listTitle">[{role}] Hospitals</div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <TextField id="standard-basic" label="Search" variant="standard" 
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}/>
        </div>
        <br />
        <Table data={[]} labels={labels} />
      </div>
	  </div>
	</div>
  );
}

export default Hospitals;