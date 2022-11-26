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
import { updatePersonData } from "../../../api/update/index";
import { useDispatch } from "react-redux";
import { setData } from "../../../store";

const UpdatePerson = ({role}) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.user);
  const dispatch = useDispatch();
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
      if (checkUpdatePersonData(personData, setError))
        return;
      const res = await updatePersonData(token, personData);
      if (res.status !== 200)
        return enqueueSnackbar("Error while updating person", {variant: "error"});
      enqueueSnackbar("Person updated successfully", {variant: "success"});
      if (role === "person") {
        const newUser = Object.assign({}, user);
        newUser.username = personData.username;
        newUser.person = personData;
        delete newUser.person.password;
        newUser.person.hospital = user.person.hospital;
        newUser.person.company = user.person.company;
        dispatch(setData({user: newUser}));
      }
      navigate(`/${role}`);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }


  useEffect(() => {
    if (role === "person") {
      const newOBJ = Object.assign({}, user.person);
      newOBJ.username = user.username;
      newOBJ.company = user.person?.company?._id || null;
      newOBJ.hospital = user.person?.hospital?._id || null;
      delete newOBJ.__v;
      setPersonData(newOBJ);
    } else {
      if (role === "hospital") {
        getMedicalPersonsData();
      } else if (role === "admin") {
        getAllPersons();
      } else if (role === "company") {
        getPersonForCompanyRoleData();
      }
      if (personData?._id)
        getPersonUser(personData?._id);
    }
  }, [personData._id]);

	return (
	<div>
    {role !== "person" && <Autocomplete
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
    />}
      <div style={{display: "flex"}}>
        <FormControl disabled={role === "person" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.firstName}>FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.firstName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.firstName}
            onChange={(e) => {
              setError({...error, firstName: false})
              if (role !== "person")
              setPersonData({...personData,
              firstName: e.target.value,
            })}}
          />
        </FormControl>
        <FormControl disabled={role === "person" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
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
              if (role !== "person")
              setPersonData({...personData,
              lastName: e.target.value,
            })}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl disabled={role === "person" && true} fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.secteur}>Activity service</InputLabel>
          <Input
            error={error.secteur}
            // labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Activity service"
            style={{width: "90%"}}
            value={personData.secteur}
            onChange={(e) => {
              setError({...error, secteur: false});
              if (role !== "person")
                setPersonData({...personData,
                  secteur: e.target.value,
                })
            }}
          />
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
        <FormControl disabled={role === "person" && true} fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label" error={error.gender}>Gender</InputLabel>
          <Select
            error={error.gender}
            // labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            style={{width: "90%"}}
            value={personData.gender}
            onChange={(e) => {
              setError({...error,
                gender: false,
              });
              if (role !== "person")
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
              disabled={role === "person" && true}
              label="Birth Date"
              inputFormat="YYYY-MM-DD"
              value={personData.birthDate}
              onChange={(newValue) => {
                setError({...error,
                  birthDate: false,
                });
                const currentYear = moment().format("YYYY");
                const age = currentYear - newValue.format("YYYY");

                if (role !== "person")
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
      <FormControl disabled={role === "person" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
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
              if (role !== "person")
              setPersonData({...personData,
              cin: e.target.value,
            })}}
          />
        </FormControl>
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

      </div>
      <div style={{display: "flex"}}>
        <FormControl disabled={role === "person" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.poids}>WEIGHT</InputLabel>
          <Input type="number" id="my-input" 
             error={error.poids}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={personData.poids}
            onChange={(e) => {
              setError({...error,
                poids: false,
              });
              if (role !== "person")
              setPersonData({...personData,
              poids: e.target.value,
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
      <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={updatePerson} fullWidth>Update</Button>
      </Stack>
	</div>
  );
}

export default UpdatePerson;