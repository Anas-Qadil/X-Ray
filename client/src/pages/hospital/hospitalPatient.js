import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { useLocation } from "react-router";

const HospitalPatient = ({role}) => {

  const location = useLocation();
  const data = [{
    id: 1,
    data: "01/01/2021",
    cin: "12345678",
    service: "Vaccination",
    examen: "Covid-19",
    equipement: "Pfizer",
    hospital: "CHU",
    dose: 1,
  }];

  let labels;
  if (location.pathname === "/persons") 
    labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Secteur", "Fonction", "Type", "Dose"]
  else 
    labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Type", "Dose"]
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

export default HospitalPatient;