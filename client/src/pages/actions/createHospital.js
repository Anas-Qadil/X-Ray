import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import checkHospital from "../../utils/checkHospital";
import { signUpHospital } from "../../api/authApi/signUp";

const CreateHospital = ({role}) => {
  
  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const [error, setError] = useState({
    username: false,
    password: false,
    name: false,
    region: false,
    ville: false,
    statut: false,
    designation: false,
    email: false,
    phone: false,
  });
  const [hospitalData, setHospitalData] = useState({
    username: '',
    password: '',
    name: '',
    region: '',
    statut: '',
    ville: '',
    designation: '',
    email: '',
    phone: '',
  });

  const addHospital =  async () => {
    try {
      if (!checkHospital(hospitalData, setError)) {
        const res = await signUpHospital(token, hospitalData);
        if (res.status === 200 || res.status === 201) {
          navigate(`/${role}`); 
        }
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }

	return (
		<>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.username}>Username</InputLabel>
          <Input type="text" id="my-input" 
            error={error.username}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.username}
            onChange={(e) => {
              setError({...error, username: false});
              setHospitalData({ ...hospitalData, username: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Password</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.password}
            onChange={(e) => {
              setError({...error, password: false});
              setHospitalData({ ...hospitalData, password: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.name}>HOSPITAL NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.name}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.name}
            onChange={(e) => {
              setError({...error, name: false});
              setHospitalData({ ...hospitalData, name: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.region} >REGION</InputLabel>
          <Input type="text" id="my-input" 
            error={error.region}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.region}
            onChange={(e) => {
              setError({...error, region: false});
              setHospitalData({ ...hospitalData, region: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.ville}>VILLE</InputLabel>
          <Input type="text" id="my-input" 
            error={error.ville}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.ville}
            onChange={(e) => {
              setError({...error, ville: false});
              setHospitalData({ ...hospitalData, ville: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">STATUT</InputLabel>
          <Input type="text" id="my-input" 
            error={error.statut}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.statut}
            onChange={(e) => {
              setError({...error, statut: false});
              setHospitalData({ ...hospitalData, statut: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.designation}>DESIGNATION</InputLabel>
          <Input type="text" id="my-input" 
            error={error.designation}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={hospitalData.designation}
            onChange={(e) => {
              setError({...error, designation: false});
              setHospitalData({ ...hospitalData, designation: e.target.value});
            }}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone}>PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={hospitalData.phone}
            onChange={(e) => {
              setError({...error, phone: false});
              setHospitalData({ ...hospitalData, phone: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>EMAIL</InputLabel>
          <Input type="text" id="my-input" 
            error={error.email}
            aria-describedby="my-helper-text" 
            style={{width: "95%"}} 
            value={hospitalData.email}
            onChange={(e) => {
              setError({...error, email: false});
              setHospitalData({ ...hospitalData, email: e.target.value});
            }}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={addHospital} fullWidth>Add Hospital</Button>
      </Stack>
		</>
  );
}

export default CreateHospital;