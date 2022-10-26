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
import { getHospitals } from "../../api/servicesApi";
import checkAddService from "../../utils/AddServiceCheck";
import { AddServiceAPI } from "../../api/servicesApi";


const AddService = ({role}) => {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [hospitals, setHospitals] = React.useState([]);
  const [error, setError] = React.useState({
    name: false,
    equipment: false,
    examen: false,
    protocol: false,
    hospital: false,
  });
  const [serviceData, setServiceData] = React.useState({
    name: '',
    equipment: '',
    examen: '',
    protocol: '',
    hospital: role === 'hospital' ? user?.hospital._id : null,
  }); // form data

  const getAllHospitals = async () => {
    try {
      const res = await getHospitals(token);
      if (res.status !== 200) {
        return enqueueSnackbar(res?.data?.message || 'Couldn\'nt Fetch Hospital Data..', {variant: 'error'})
      }
      let obj = [];
      res?.data?.data?.forEach((item) => {
        obj.push({
          label: item.name,
          data: item
        }); 
      })
      setHospitals(obj);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const AddService__ = async () => {
    try {
      if (!checkAddService(serviceData, setError)) {
        const res = await AddServiceAPI(token, serviceData);
        if (res.status === 200 || res.status === 201) {
          enqueueSnackbar(res?.data?.message || 'Service Added Successfully..', {variant: 'success'})
          navigate(`/${role}`);
        } else {
          return enqueueSnackbar(res?.data?.message || 'Couldn\'nt Add Service..', {variant: 'error'})
        }
      } else {
        enqueueSnackbar('Please Check Your Inputs..', {variant: 'error'})
      }
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong...', {variant: 'error'})
    }
  }

  useEffect(() => {
    getAllHospitals();
  }, []);

	return (
  <div className="home">
    <Sidebar role={role} />
    <div className="homeContainer">
      <Container  component={Paper} maxWidth="md" style={{marginTop: "60px", paddingBottom: "60px"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Add Service</h1>
        <br />
        <br />
        <br />
        {role==="admin" &&  
          <Autocomplete
            style={{marginBottom: "20px"}}
            disablePortal
            id="combo-box-demo"
            options={hospitals}
            onChange={(e, value) => {
              setError({ ...error, hospital: false });
              setServiceData({
                ...serviceData,
                hospital: value?.data?._id,
              });
            }}
            renderInput={(params) => <TextField error={error.hospital} {...params} label="Hospitals" />}
          />}
        <div style={{display: "flex"}}>
          <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
            <InputLabel htmlFor="my-input" error={error.name}>Service Name</InputLabel>
            <Input type="text" id="my-input" 
              aria-describedby="my-helper-text" 
              style={{width: "95%"}}
              onChange={(e) => {
              setError({
                ...error,
                name: false,
              });
              setServiceData({...serviceData, name: e.target.value})}}
              value={serviceData.name}
              error={error.name}
            />
          </FormControl>
          <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
            <InputLabel htmlFor="my-input" error={error.equipment}>Equipement</InputLabel>
            <Input type="text" id="my-input" 
              aria-describedby="my-helper-text" 
              onChange={(e) => {
              setError({
                ...error,
                equipment: false,
              });
              setServiceData({...serviceData, equipment: e.target.value})}}
              value={serviceData.equipment}
              error={error.equipment}
            />
          </FormControl>
        </div>
        <div style={{display: "flex"}}>
          <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
            <InputLabel htmlFor="my-input" error={error.examen}>Examen</InputLabel>
            <Input type="text" id="my-input" 
              aria-describedby="my-helper-text" 
              style={{width: "95%"}}
              onChange={(e) => {
              setError({
                ...error,
                examen: false,
              });
              setServiceData({...serviceData, examen: e.target.value})}}
              value={serviceData.examen}
              error={error.examen}
            />
          </FormControl>
          <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
            <InputLabel htmlFor="my-input" error={error.protocol}>Protocol</InputLabel>
            <Input type="text" id="my-input" 
              aria-describedby="my-helper-text" 
              onChange={(e) => {
              setError({
                ...error,
                protocol: false,
              });
              setServiceData({...serviceData, protocol: e.target.value})}}
              value={serviceData.protocol}
              error={error.protocol}
            />
          </FormControl>
        </div>
        <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
          <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
          <Button variant="contained" onClick={AddService__} fullWidth>Add Service</Button>
        </Stack>
      </Container>
      </div>
  </div>
  );
}

export default AddService;