import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { getCompanies, getHospitals, getUserHospital } from "../../../api/servicesApi";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { checkUpdateHospital } from "../../../utils/checkHospital";
import { updateHospitalData } from "../../../api/update";
import { useDispatch } from "react-redux";
import { setData } from "../../../store";

const UpdateHospital = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()
	const user = useSelector(state => state?.data?.user);
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const [error, setError] = useState({
    username: false,
    password: false,
    address: false,
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
    address: '',
    region: '',
    statut: '',
    ville: '',
    designation: '',
    email: '',
    phone: '',
  });
  const [hospitals, setHospitals] = useState([]);
  
  const getAllHospitals = async () => {
    try {
      const res = await getHospitals(token);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching hospitals", {variant: "error"});
      const options = [];
      res.data?.data?.map((hospital) => {
        options.push({
          label: hospital.designation + ' - ' + hospital.region,
          data: hospital,
        })
      });
      setHospitals(options);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getHospitalUser = async (id) => {
    try {
      const res = await getUserHospital(token, id);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching hospital user", {variant: "error"});
      setHospitalData({
        ...hospitalData,
        username: res.data?.data?.username,
      });
      console.log(res);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const updateHospital = async () => {
    try {
      if (checkUpdateHospital(hospitalData, setError))
        return enqueueSnackbar("Please check your inputs", {variant: "error"});

      const res = await updateHospitalData(token, hospitalData);
      if (res.status !== 200)
        return enqueueSnackbar("Error while updating hospital", {variant: "error"});
      enqueueSnackbar("Hospital updated successfully", {variant: "success"});
      if (role === "hospital") {
        const newUser = Object.assign({}, user);
        newUser.username = hospitalData.username;
        newUser.hospital = hospitalData;
        delete newUser.hospital.password;
        dispatch(setData({ user: newUser }));
      }
      navigate(`/${role}`);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    if (role === "hospital") {
      const newOBJ = Object.assign({}, user.hospital);
      newOBJ.username = user.username;
      delete newOBJ.__v;
      setHospitalData(newOBJ);

    } else {
      if (role !== 'admin') {
        navigate(`/${role}`);
      }
      getAllHospitals();
      if (hospitalData._id)
        getHospitalUser(hospitalData._id);
    }
  }, [hospitalData._id]);

	return (
	<div>
    { role !== "hospital" &&    
      <Autocomplete
        style={{marginBottom: "20px"}}
        disablePortal
        id="combo-box-demo"
        options={hospitals}
        onChange={(e, value) => {
          if (value === null) {
            setHospitalData({
              username: '',
              password: '',
              address: '',
              region: '',
              statut: '',
              ville: '',
              designation: '',
              email: '',
              phone: '',
            });
            return;
          }
          setHospitalData({
            ...hospitalData,
            _id: value.data._id,
            address: value.data.address,
            region: value.data.region,
            statut: value.data.statut,
            ville: value.data.ville,
            designation: value.data.designation,
            email: value.data.email,
            phone: value.data.phone,

          });
        }}
        renderInput={(params) => <TextField {...params} label="Hospitals" />}
      />
    }
    <div style={{display: "flex"}}>
      <FormControl disabled={role === "hospital" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.designation}>Designation</InputLabel>
        <Input type="text" id="my-input" 
          error={error.designation}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}} 
          value={hospitalData.designation}
          onChange={(e) => {
            setError({...error, designation: false});
            if (role !== "hospital")
              setHospitalData({ ...hospitalData, designation: e.target.value});
          }}
        />
      </FormControl>
      <FormControl disabled={role === "hospital" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.statut}>Statut</InputLabel>
        <Input type="text" id="my-input" 
          error={error.statut}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}}
          value={hospitalData.statut}
          onChange={(e) => {
            setError({...error, statut: false});
            if (role !== "hospital")
              setHospitalData({ ...hospitalData, statut: e.target.value});
          }}
        />
      </FormControl>
    </div>
    <div style={{display: "flex"}}>
    <FormControl disabled={role === "hospital" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.region} >Region</InputLabel>
        <Input type="text" id="my-input" 
          error={error.region}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}}
          value={hospitalData.region}
          onChange={(e) => {
            setError({...error, region: false});
            if (role !== "hospital")
              setHospitalData({ ...hospitalData, region: e.target.value});
          }}
        />
      </FormControl>
      <FormControl disabled={role === "hospital" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.ville}>Ville</InputLabel>
        <Input type="text" id="my-input" 
          error={error.ville}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}} 
          value={hospitalData.ville}
          onChange={(e) => {
            setError({...error, ville: false});
            if (role !== "hospital")
              setHospitalData({ ...hospitalData, ville: e.target.value});
          }}
        />
      </FormControl>

    </div>
    <div style={{display: "flex"}}>
      <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.phone}>Phone</InputLabel>
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
      <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.email}>Email</InputLabel>
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
    <div style={{display: "flex"}}>
      <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.address}>Address</InputLabel>
        <Input type="text" id="my-input" 
          error={error.address}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}} 
          value={hospitalData.address}
          onChange={(e) => {
            setError({...error, address: false});
            setHospitalData({ ...hospitalData, address: e.target.value});
          }}
        />
      </FormControl>
    </div>
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
    <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
      <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
      <Button variant="contained" onClick={updateHospital} fullWidth>Update Hospital</Button>
    </Stack>
	</div>
  );
}

export default UpdateHospital;