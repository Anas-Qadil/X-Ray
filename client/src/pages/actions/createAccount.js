import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CreatePerson from "./CreatePerson";
import CreatePatient from "./createPatient";
import CreateHospital from "./createHospital";
import CreateCompany from "./createCompany";

const CreateAccount = ({role}) => {
  
  const [accountType, setAccountType] = React.useState('patient'); // patient or person
  const [traitementData, setTraitementData] = React.useState({
    patient: null,
    person: null,
    service: null,
    date: moment().format("YYYY-MM-DD"),
    dose: '',
  }); // form data


	return (
  <div className="home">
    <Sidebar role={role} />
    <div className="homeContainer">
      <Navbar />
      <Container  component={Paper} maxWidth="md" style={{marginTop: "40px", paddingBottom: "60px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Create Account</h1>
        <br />
        <br />
        <br />
        <FormControl fullWidth style={{marginBottom: "20px"}}>
          <InputLabel id="demo-simple-select-label">Choose Person Or Patient</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            label="Choose Person Or Patient"
          >
            {(role === "admin" || role === "hospital") && <MenuItem value="patient">Patient</MenuItem>}
            {(role === "admin" || role === "hospital" || role === "company") && <MenuItem value="person">Person</MenuItem>}
            {role === "admin" && <MenuItem value="hospital">Hospital</MenuItem>}
            {role === "admin" && <MenuItem value="company">Company</MenuItem>}
          </Select>
        </FormControl>
        <br />
        <br />
        <hr />
        <br />
        {accountType === "person" && <CreatePerson />}
        {accountType === "patient" && <CreatePatient />}
        {accountType === "hospital" && <CreateHospital />}
        {accountType === "company" && <CreateCompany />}
      </Container>
      </div>
  </div>
  );
}

export default CreateAccount;


