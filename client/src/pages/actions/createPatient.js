import React from "react";
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkPatientData } from "../../utils/checkPatient";
import { signUpPatient } from "../../api/authApi/signUp";
import { useSnackbar } from 'notistack'

const CreatePatient = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const navigate = useNavigate();
  const [error, setError] = React.useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    cin: false,
    gender: false,
    birthDate: false,
    age: false,
    address: false,
    phone: false,
    email: false,
    poids: false,
  });
  const [patientData, setPatientData] = React.useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    cin: '',
    gender: '',
    birthDate: moment().format("YYYY-MM-DD"),
    age: '',
    address: '',
    phone: '',
    email: '',
    poids: '',
  });

  const addPatient = async () => {
    try {
      if (!checkPatientData(patientData, setError)) {
        const res = await signUpPatient(token, patientData);
        if (res.status === 200 || res.status === 201) {
          enqueueSnackbar('Patient was created successfully', {variant: 'success'})
          navigate(`/${role}`);
        }
      } else 
        enqueueSnackbar('Please Check your inputs', {variant: 'error'})
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

	return (
    <>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.firstName} >FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.firstName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={patientData.firstName}
            onChange={(e) => {
              setError({...error, firstName: false});
              setPatientData({...patientData, firstName: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.lastName}>LAST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.lastName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={patientData.lastName}
            onChange={(e) => {
              setError({...error, lastName: false});
              setPatientData({...patientData, lastName: e.target.value})}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.gender} >Gender</InputLabel>
          <Select
            error={error.gender}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            style={{width: "90%"}}
            value={patientData.gender}
            onChange={(e) => {
              setError({...error, gender: false});
              setPatientData({...patientData, gender: e.target.value})}}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={1} style={{width: "90%", marginRight: "40px"}}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="YYYY-MM-DD"
              value={patientData.birthDate}
              onChange={(newValue) => {
                setError({...error,
                  birthDate: false,
                });
                const currentYear = moment().format("YYYY");
                const age = currentYear - newValue.format("YYYY");
                setPatientData({...patientData, 
                  birthDate: newValue.format("YYYY-MM-DD"),
                  age: age
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone} >PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={patientData.phone}
            onChange={(e) => {
              setError({...error,
                phone: false,
              });
              setPatientData({...patientData, phone: e.target.value})}
            }
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}} disabled>
          <InputLabel htmlFor="my-input" error={error.age}>{patientData?.age || "Age"}</InputLabel>
          <Input type="text" id="my-input" 
            error={error.age}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.address}>ADDRESS</InputLabel>
          <Input type="text" id="my-input" 
            error={error.address}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={patientData.address}
            onChange={(e) => {
              setError({...error,
                address: false,
              });
              setPatientData({...patientData, address: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>EMAIL</InputLabel>
          <Input type="text" id="my-input" 
            error={error.email}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={patientData.email}
            onChange={(e) => {
              setError({...error,
                email: false,
              });
              setPatientData({...patientData, email: e.target.value})}
            }
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.cin}>CIN</InputLabel>
          <Input type="text" id="my-input" 
            error={error.cin}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={patientData.cin}
            onChange={(e) => {
              setError({...error,
                cin: false,
              });
              setPatientData({...patientData, cin: e.target.value})}
            }
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.poids}>POIDS</InputLabel>
          <Input type="number" id="my-input" 
            error={error.poids}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={patientData.poids}
            onChange={(e) => {
              setError({...error,
                poids: false,
              });
              setPatientData({...patientData, poids: e.target.value})}
            }

          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.username} >Username</InputLabel>
          <Input type="text" id="my-input" 
            error={error.username}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={patientData.username}
            onChange={(e) => {
              setError({...error, username: false});
              setPatientData({...patientData, username: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Password</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={patientData.password}
            onChange={(e) => {
              setError({...error, password: false});
              setPatientData({...patientData, password: e.target.value})}}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={addPatient} fullWidth>Add Patient</Button>
      </Stack>
    </>
  );
}

export default CreatePatient;