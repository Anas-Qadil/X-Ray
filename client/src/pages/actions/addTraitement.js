import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { Container, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";


const AddTraitement = ({role}) => {
  
  const [traitementType, setTraitementType] = React.useState('patient'); // patient or person
  const [traitementData, setTraitementData] = React.useState({
    patient: null,
    person: null,
    service: null,
    date: moment().format("YYYY-MM-DD"),
    dose: '',
  }); // form data

  console.log(traitementData);

	return (
  <div className="home">
    <Sidebar role={role} />
    <div className="homeContainer">
      <Navbar />
      <Container  component={Paper} maxWidth="md" style={{marginTop: "60px", paddingBottom: "60px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Add Traitement</h1>
        <br />
        <br />
        <br />
        <FormControl fullWidth style={{marginBottom: "20px"}}>
          <InputLabel id="demo-simple-select-label">Choose Person Or Patient</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={traitementType}
            label="Choose Person Or Patient"
            onChange={(e) => {
              setTraitementData({
                patient: null,
                person: null,
                service: null,
                date: null,
                dose: '',
              });
              setTraitementType(e.target.value)
            }}
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="person">Person</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <hr />
        <br />
        {traitementType === "patient" && (
          <FormControl fullWidth style={{marginBottom: "20px"}}>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={traitementData.patient}
              label="Patient"
              onChange={(e) => setTraitementData({...traitementData, patient: e.target.value})}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
        {traitementType === "person" && (
          <FormControl fullWidth style={{marginBottom: "20px"}}>
            <InputLabel id="demo-simple-select-label">Person</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={traitementData.person}
              label="Person"
              onChange={(e) => setTraitementData({...traitementData, person: e.target.value})}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth style={{marginBottom: "20px"}}>
          <InputLabel id="demo-simple-select-label">Service</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={traitementData.service}
            label="Service"
            onChange={(e) => setTraitementData({...traitementData, service: e.target.value})}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">Dose Value</InputLabel>
          <Input type="number" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "50%"}} 
            onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            value={traitementData.dose}
          />
        </FormControl>
        <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
          <Button variant="outlined" fullWidth="true">Cancel</Button>
          <Button variant="contained" fullWidth="true">Add Traitement</Button>
        </Stack>
      </Container>
      </div>
  </div>
  );
}

export default AddTraitement;