import React, { useEffect } from "react";
import { FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'
import Autocomplete from '@mui/material/Autocomplete';
import { getMedicalPersons, getUserPerson, getPersons, getPersonForCompanyRole } from "../../../api/servicesApi";
import { checkUpdatePersonData } from "../../../utils/checkPatient";

const UpdatePerson = ({role}) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
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
    secteur: false,
    fonction: false,
    poids: false,
    type: false,
    company: false,
    hospital: false,
  });
  const [personData, setPersonData] = React.useState({
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
    secteur: '',
    fonction: '',
    type: '',
    company: null,
    hospital: null,
  });

  const [persons, setPersons] = React.useState([]);

  const getMedicalPersonsData = async () => {
    try {
      const res = await getMedicalPersons(token);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching medical persons", {variant: "error"});
      
      const options = [];
      res.data?.data?.map((person) => {
        options.push({
          label: person?.firstName + ' - ' + person?.lastName + ' - ' + person?.cin + ' - ' + person?.type,
          data: person,
        })
      });
      setPersons(options);

    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getPersonUser = async (id) => {
    try {
      const res = await getUserPerson(token, id);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching person", {variant: "error"});
      setPersonData({
        ...personData,
        username: res.data?.data?.username,
      });
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getAllPersons = async () => {
    try {
      const res = await getPersons(token, "");
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching persons", {variant: "error"});
      const options = [];
      res.data?.data?.map((person) => {
        options.push({
          label: person?.firstName + ' - ' + person?.lastName + ' - ' + person?.cin + ' - ' + person?.type,
          data: person,
        })
      });
      setPersons(options);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getPersonForCompanyRoleData = async () => {
    try {
      const res = await getPersonForCompanyRole(token, "");
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching persons", {variant: "error"});
      const options = [];
      res.data?.data?.map((person) => {
        options.push({
          label: person?.firstName + ' - ' + person?.lastName + ' - ' + person?.cin + ' - ' + person?.type,
          data: person,
        })
      });
      setPersons(options);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const updatePerson = async () => {
    try {
      if (!checkUpdatePersonData(personData, setError))
        console.log("all done");
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    if (role === "hospital") {
      getMedicalPersonsData();
    } else if (role === "admin") {
      getAllPersons();
    } else if (role === "company") {
      getPersonForCompanyRoleData();
    }
    if (personData?._id)
      getPersonUser(personData?._id);
  }, [personData._id]);

	return (
	<div>
    <Autocomplete
      style={{marginBottom: "20px"}}
      disablePortal
      id="combo-box-demo"
      options={persons}
      onChange={(e, value) => {
      //   setError({ ...error, person: false });
        if (value === null) {
          setPersonData({
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
            secteur: '',
            fonction: '',
            type: '',
            company: null,
            hospital: null,
          });
          return;
        }
        setPersonData({
          ...personData,
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
          secteur: value.data.secteur,
          fonction: value.data.fonction,
          type: value.data.type,
          company: value.data?.company?._id || value.data?.company,
          hospital: value.data?.hospital?._id || value.data?.hospital,
        });
      }}
      renderInput={(params) => <TextField {...params} label="Professional Healthcare" />}
    />
    <br /> <br /> <br />
    <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
        <InputLabel id="demo-simple-select-label" error={error.type}>Professional Healthcare Type</InputLabel>
        <Select
          error={error.type}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Professional Healthcare Type"
          style={{width: "95%"}}
          value={personData.type}
          onChange={(e) => {
            // empty personData
            setPersonData({...personData,
              type: e.target.value,
          })}}
        >
          <MenuItem value="medical">Medical</MenuItem>
          <MenuItem value="technical">Technical</MenuItem>
        </Select>
      </FormControl>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.username}>Username</InputLabel>
          <Input type="text" id="my-input" 
            error={error.username}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.username}
            onChange={(e) => {
              setError({...error, username: false});
              setPersonData({...personData,
              username: e.target.value,
            })}}

          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Passwrod</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.password}
            onChange={(e) => {
              setError({...error,
                password: false,
              });
              setPersonData({...personData,
              password: e.target.value,
            })}}

          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.secteur}>Secteur d’activité</InputLabel>
          <Select
            error={error.secteur}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Secteur d’activité"
            style={{width: "90%"}}
            value={personData.secteur}
            onChange={(e) => {
              setError({...error, secteur: false});
              setPersonData({...personData,
              secteur: e.target.value,
            })}}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.fonction}>Fonction</InputLabel>
          <Input type="text" id="my-input" 
             error={error.fonction}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.fonction}
            onChange={(e) => {
              setError({...error, fonction: false});
              setPersonData({...personData,
              fonction: e.target.value,
            })}}

          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.firstName}>FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.firstName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.firstName}
            onChange={(e) => {
              setError({...error, firstName: false})
              setPersonData({...personData,
              firstName: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.lastName}>LAST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.lastName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.lastName}
            onChange={(e) => {
              setError({...error,
                lastName: false,
              })
              setPersonData({...personData,
              lastName: e.target.value,
            })}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.gender}>Gender</InputLabel>
          <Select
            error={error.gender}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            style={{width: "90%"}}
            value={personData.gender}
            onChange={(e) => {
              setError({...error,
                gender: false,
              });
              setPersonData({...personData,
              gender: e.target.value
            })}}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={1} style={{width: "90%", marginRight: "40px"}} error={error.birthDate}>
            <DesktopDatePicker
              label="Birth Date"
              inputFormat="YYYY-MM-DD"
              value={personData.birthDate}
              onChange={(newValue) => {
                setError({...error,
                  birthDate: false,
                });
                const currentYear = moment().format("YYYY");
                const age = currentYear - newValue.format("YYYY");
                setPersonData({...personData,
                  birthDate: newValue.format("YYYY-MM-DD"),
                  age: age,
                });
              }}             
              renderInput={(params) => <TextField {...params} error={error.birthDate} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone}>PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.phone}
            onChange={(e) => {
              setError({...error,
                phone: false,
              });
              setPersonData({...personData,
              phone: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}} disabled>
          <InputLabel htmlFor="my-input">{personData?.age || "Age"}</InputLabel>
          <Input type="text" id="my-input" 
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
            value={personData.address}
            onChange={(e) => {
              setError({...error,
                address: false,
              });
              setPersonData({...personData,
              address: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>EMAIL</InputLabel>
          <Input type="email" id="my-input"
            error={error.email} 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={personData.email}
            onChange={(e) => {
              setError({...error,
                email: false,
              });
              setPersonData({...personData,
              email: e.target.value,
            })}}
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
            value={personData.cin}
            onChange={(e) => {
              setError({...error,
                cin: false,
              })
              setPersonData({...personData,
              cin: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.poids}>POIDS</InputLabel>
          <Input type="number" id="my-input" 
             error={error.poids}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.poids}
            onChange={(e) => {
              setError({...error,
                poids: false,
              });
              setPersonData({...personData,
              poids: e.target.value,
            })}}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={updatePerson} fullWidth>Update {personData.type} Person</Button>
      </Stack>
	</div>
  );
}

export default UpdatePerson;