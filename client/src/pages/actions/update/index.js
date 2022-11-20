import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/sidebar/Sidebar";
import UpdateHospital from './updateHospital';
import UpdateCompany from './updateCompany';
import UpdatePerson from './updatePerson';
import UpdatePatient from './updatePatient';
import Paper from "@mui/material/Paper";
import { Container } from '@mui/material';
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import UpdateAdmin from './updateAdmin';

const Update = ({role}) => {

  const navigate = useNavigate();
  const [updateType, setUpdateType] = useState(role === "patient" ? "patient" : "person"); // patient or person

  // useEffect(() => {
  //   // if (role === "patient" || role === "person") {
  //   //   navigate(`/${role}`);
  //   // }
  // }, []);

	return (
    <div className="home">
      <Sidebar role={role} />
      <div className="homeContainer">
      <Container  component={Paper} maxWidth="md" style={{marginTop: "40px", paddingBottom: "60px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Update Information</h1>
        {role !== "patient" && role !== "person" && <FormControl fullWidth style={{marginBottom: "20px"}}>
          <InputLabel id="demo-simple-select-label">Update</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={updateType}
            onChange={(e) => setUpdateType(e.target.value)}
            label="Update"
          >
            {(role === "admin") && <MenuItem value="patient">Patient</MenuItem>}
            {(role === "admin" || role === "hospital" || role === "company") && <MenuItem value="person">Professional Healthcare</MenuItem>}
            {role === "admin" && <MenuItem value="hospital">Hospital</MenuItem>}
            {role === "admin" && <MenuItem value="company">Company</MenuItem>}
            {role === "admin" && <MenuItem value="admin">Admin</MenuItem>}
          </Select>
        </FormControl>}
        {updateType === "person" && <UpdatePerson role={role} />}
        {updateType === "patient" && <UpdatePatient role={role}  />}
        {updateType === "hospital" && <UpdateHospital role={role} />}
        {updateType === "company" && <UpdateCompany role={role} />}
        {updateType === "admin" && <UpdateAdmin role={role} />}
      </Container>
      </div>
    </div>
  );
}

export default Update;

