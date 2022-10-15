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
import checkifEmpty from "../../utils/checkIfEmpty";
import { useNavigate } from "react-router-dom";
import { addPersonTraitement, addPatientTraitement } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'


const AddTraitement = ({role}) => {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [patients, setPatients] = React.useState([]);
  const [persons, setPersons] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [traitementType, setTraitementType] = React.useState('patient'); // patient or person
  const [error, setError] = React.useState({
    patient: false,
    person: false,
    service: false,
    dose: false,
  });
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
      console.log(res);
      res.data?.data?.map((patient) => {
        options.push({
          label: patient.firstName + ' ' + patient.lastName + ' - ' + patient.cin,
          data: patient,
        })
      });
      setPatients(options);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getHospitalPatients = async () => {
    try {
      
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getServices = async () => {
    try {
      const res = await getAllServices(token);
      const options = [];
      res.data.data.map((service) => {
        options.push({
          label: service.name + ' ' + service.equipment + ' ' + service.examen +' - ' + service.hospital.designation,
          data: service,
        })
      }
      );
      setServices(options);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
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
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const AddTraitement = async () => {
    try {
      if(!checkifEmpty(traitementData, setError)) {
        if (traitementType === 'person') {
          const res = await addPersonTraitement(token, traitementData);
          if (res.status === 200 || res.status === 201) {
            enqueueSnackbar('Traitement was Added successfully', {variant: 'success'})
            navigate(`/${role}`);
          }
        } else {
          const res = await addPatientTraitement(token, traitementData);
          if (res.status === 200 || res.status === 201) {
            enqueueSnackbar('Traitement was Added successfully', {variant: 'success'})
            navigate(`/${role}`);
          }
        }
      } else {
        enqueueSnackbar('Please Check your inputs', {variant: 'error'})
      }
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong...', {variant: 'error'})
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
      {/* <Navbar /> */}
      <Container  component={Paper} maxWidth="md" style={{marginTop: "60px", paddingBottom: "60px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Add Traitement</h1>
        <br />
        <br />
        <br />
        <FormControl fullWidth style={{marginBottom: "20px"}}>
          <InputLabel id="demo-simple-select-label">Choose Professional Healthcare Or Patient</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={traitementType}
            label="Choose Professional Healthcare Or Patient"
            onChange={(e) => {
              setTraitementData({
                patient: null,
                person: null,
                service: null,
                date: moment().format("YYYY-MM-DD"),
                dose: '',
              });
              setTraitementType(e.target.value)
            }}
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="person">Professional Healthcare</MenuItem>
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
              setError({ ...error, patient: false });
              setTraitementData({
                ...traitementData,
                patient: value?.data?._id,
              });
            }}
            renderInput={(params) => <TextField error={error.patient}  {...params} label="Patient" />}
          />
        )}
        {traitementType === "person" && (
          <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={persons}
            onChange={(e, value) => {
              setError({ ...error, person: false });
              setTraitementData({
                ...traitementData,
                person: value?.data?._id,
              });
            }}
            renderInput={(params) => <TextField error={error.person} {...params} label="Professional Healthcare" />}
          />
        )}
        <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={services}
            onChange={(e, value) => {
              setError({ ...error, service: false });
              setTraitementData({
                ...traitementData,
                service: value?.data?._id,
              });
            }}
            renderInput={(params) => <TextField error={error.service} {...params} label="Services" />}
          />
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.dose}>Dose Value</InputLabel>
          <Input type="number" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "50%"}} 
            onChange={(e) => {
              setError({
                ...error,
                dose: false,
              });
              setTraitementData({...traitementData, dose: e.target.value})}}
            value={traitementData.dose}
            error={error.dose}
          />
        </FormControl>
        <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
          <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
          <Button variant="contained" onClick={AddTraitement} fullWidth>Add Traitement</Button>
        </Stack>
      </Container>
      </div>
  </div>
  );
}

export default AddTraitement;