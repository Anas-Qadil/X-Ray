import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack'
import { getPatientForHospitlRole, getPatients, getUserPatient } from "../../../api/servicesApi";
import Autocomplete from '@mui/material/Autocomplete';
import { checkUpdatePatientData } from "../../../utils/checkPatient";
import { updatePatientData } from "../../../api/update";
import { useDispatch } from "react-redux";
import { setData } from "../../../store";

const UpdatePatient = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.user);
  const dispatch = useDispatch();

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

  const [patients, setPatients] = React.useState([]);

  const getPatients_ = async () => {
    try {
      const res = await getPatients(token, "");
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching patients", {variant: "error"});
      const options = [];
      res.data?.data?.map((patient) => {
        options.push({
          label: patient.firstName + ' ' + patient.lastName + ' - ' + patient.cin,
          data: patient,
        })
      });
      setPatients(options);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getPatientUser = async (id) => {
    try {
      const res = await getUserPatient(token, id);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching patient user", {variant: "error"});
      setPatientData({
        ...patientData,
        username: res.data?.data?.username,
      });
      console.log(res);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const updatePatient = async () => {
    try {
      if (checkUpdatePatientData(patientData, setError))
        return enqueueSnackbar("Please check your inputs", {variant: "error"});
      const res = await updatePatientData(token, patientData);
      if (res.status !== 200)
        return enqueueSnackbar("Error while updating patient", {variant: "error"});
      enqueueSnackbar("Patient updated successfully", {variant: "success"});

      if (role === "patient") {
        const newUser = Object.assign({}, user);
        newUser.username = patientData.username;
        newUser.patient = patientData;
        delete newUser.patient.password;
        dispatch(setData({user: newUser}));
      }
      navigate(`/${role}`);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    if (role === "patient") {
      setPatientData({
        ...patientData,
        username: user.username,
        password: '',
        firstName: user.patient.firstName,
        lastName: user.patient.lastName,
        cin: user.patient.cin,
        gender: user.patient.gender,
        birthDate: user.patient.birthDate,
        age: user.patient.age,
        address: user.patient.address,
        phone: user.patient.phone,
        email: user.patient.email,
        poids: user.patient.poids,
        _id: user.patient._id,
      });
    } else {
      getPatients_();
      if (patientData?._id)
        getPatientUser(patientData?._id);
    }
  }, [patientData._id]);
  

	return (
	<div>
    {role !== "patient" && <Autocomplete
      style={{marginBottom: "20px"}}
      disablePortal
      id="combo-box-demo"
      options={patients}
      onChange={(e, value) => {
      //   setError({ ...error, person: false });
        if (value === null) {
          setPatientData({
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
          return;
        }
        setPatientData({
          ...patientData,
          _id: value.data._id,
          firstName: value.data.firstName,
          lastName: value.data.lastName,
          cin: value.data.cin,
          gender: value.data.gender,
          birthDate: value.data.birthDate,
          age: value.data.age,
          address: value.data.address,
          phone: value.data.phone,
          email: value.data.email,
          poids: value.data.poids,
        });
      }}
      renderInput={(params) => <TextField {...params} label="Patients" />}
    />}
    <div style={{display: "flex"}}>
      <FormControl disabled={role === "patient" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.firstName} >First Name</InputLabel>
        <Input type="text" id="my-input" 
          error={error.firstName}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}} 
          value={patientData.firstName}
          onChange={(e) => {
            setError({...error, firstName: false});
            if (role !== "patient") 
              setPatientData({...patientData, firstName: e.target.value})}}
        />
      </FormControl>
      <FormControl disabled={role === "patient" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.lastName}>Last Name</InputLabel>
        <Input type="text" id="my-input" 
          error={error.lastName}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}}
          value={patientData.lastName}
          onChange={(e) => {
            setError({...error, lastName: false});
            if (role !== "patient")  
              setPatientData({...patientData, lastName: e.target.value})}
          }
        />
      </FormControl>
    </div>
    <div style={{display: "flex"}}>
      <FormControl disabled={role === "patient" && true} fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
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
            if (role !== "patient") 
              setPatientData({...patientData, gender: e.target.value})}}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <Stack spacing={1} style={{width: "90%", marginRight: "40px"}}>
          <DesktopDatePicker
            disabled={role === "patient" && true}
            label="Date desktop"
            inputFormat="YYYY-MM-DD"
            value={patientData.birthDate}
            onChange={(newValue) => {
              setError({...error,
                birthDate: false,
              });
              const currentYear = moment().format("YYYY");
              const age = currentYear - newValue.format("YYYY");
              if (role !== "patient") 
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
      <FormControl disabled={role === "patient" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
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
            if (role !== "patient") 
              setPatientData({...patientData, cin: e.target.value})}
          }
        />
      </FormControl>
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
    </div>
    <div style={{display: "flex"}}>
      <FormControl disabled={role === "patient" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.poids}>WEIGHT</InputLabel>
        <Input type="number" id="my-input" 
          error={error.poids}
          aria-describedby="my-helper-text" 
          style={{width: "90%"}}
          value={patientData.poids}
          onChange={(e) => {
            setError({...error,
              poids: false,
            });
            if (role !== "patient") 
              setPatientData({...patientData, poids: e.target.value})}
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
    <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
      <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
      <Button variant="contained" onClick={updatePatient} fullWidth>Update</Button>
    </Stack>
	</div>
  );
}

export default UpdatePatient;