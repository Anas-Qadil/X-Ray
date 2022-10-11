import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getPatients, getPersons } from "../../api/servicesApi";
import { useSelector } from "react-redux";
import { getAllServices } from "../../api/servicesApi";

const AddTraitement = ({role}) => {
  
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [patients, setPatients] = React.useState([]);
  const [persons, setPersons] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [traitementType, setTraitementType] = React.useState('patient'); // patient or person
  const [traitementData, setTraitementData] = React.useState({
    patient: null,
    person: null,
    service: null,
    date: moment().format("YYYY-MM-DD"),
    dose: '',
  }); // form data

  const getAllPatients = async () => {
    try {
      const res = await getPatients(token, '');
      const options = [];
      res.data.patients.map((patient) => {
        options.push({
          label: patient.firstName + ' ' + patient.lastName + ' - ' + patient.cin,
          data: patient,
        })
      });
      setPatients(options);
    } catch (e) {
      console.log(e);
    }
  }

  const getHospitalPatients = async () => {
    try {
      
    } catch (e) {
      console.log(e);
    }
  }

  const getServices = async () => {
    try {
      const res = await getAllServices(token);
      console.log(res.data.data);
      const options = [];
      res.data.data.map((service) => {
        options.push({
          label: service.name + ' ' + service.equipment + ' ' + service.examen +' - ' + service.hospital.designation,
          data: service,
        })
      }
      );
      console.log(options);
      setServices(options);
    } catch (e) {
      console.log(e);
    }
  }

  const getAllPersons = async () => {
    try {
      const res = await getPersons(token, '');
      const options = [];
      res.data.data.map((person) => {
        options.push({
          label: person.firstName + ' ' + person.lastName + ' - ' + person.cin,
          data: person,
        })
      });
      setPersons(options);
    } catch (e) {
      console.log(e);
    }
  }

  const AddTraitement = async () => {
    try {
      console.log(traitementData);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (role === "admin") {
      getAllPatients();
      getAllPersons();
    } else if (role === "hospital") {
      getHospitalPatients();
    }
    getServices();
  }, []);

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
          <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={patients}
            onChange={(e, value) => {
              console.log(value);
              setTraitementData({
                ...traitementData,
                patient: value,
              });
            }}
            renderInput={(params) => <TextField {...params} label="Patient" />}
          />
        )}
        {traitementType === "person" && (
          // <FormControl fullWidth style={{marginBottom: "20px"}}>
          //   <InputLabel id="demo-simple-select-label">Person</InputLabel>
          //   <Select
          //     labelId="demo-simple-select-label"
          //     id="demo-simple-select"
          //     value={traitementData.person}
          //     label="Person"
          //     onChange={(e) => setTraitementData({...traitementData, person: e.target.value})}
          //   >
          //     <MenuItem value={10}>Ten</MenuItem>
          //     <MenuItem value={20}>Twenty</MenuItem>
          //     <MenuItem value={30}>Thirty</MenuItem>
          //   </Select>
          // </FormControl>
          <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={persons}
            onChange={(e, value) => {
              setTraitementData({
                ...traitementData,
                person: value,
              });
            }}
            renderInput={(params) => <TextField {...params} label="Person" />}
          />
        )}
        <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={services}
            onChange={(e, value) => {
              setTraitementData({
                ...traitementData,
                service: value,
              });
            }}
            renderInput={(params) => <TextField {...params} label="Services" />}
          />
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