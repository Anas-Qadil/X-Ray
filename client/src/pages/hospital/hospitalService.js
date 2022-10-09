import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';


const HospitalService = ({role}) => {

  const data = [{
    id: 1,
    data: "01/01/2021",
    cin: "12345678",
    service: "Vaccination",
    examen: "Covid-19",
  }];

  const labels = ["Name", "Equipement", "Examen", "Protocol", "Hopital"]

  if (role === "admin") labels.push("Action");

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
        <div className="listTitle">[{role}] Latest Operations</div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <TextField id="standard-basic" label="Search" variant="standard" 
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}/>
        </div>
        <br />
        <Table data={data} labels={labels} />
      </div>
	  </div>
	</div>
  );
}

export default HospitalService;