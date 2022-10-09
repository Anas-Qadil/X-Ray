import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
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


const CreatePatient = ({role}) => {
  
  const [accountType, setAccountType] = React.useState('patient'); // patient or person
  const [traitementData, setTraitementData] = React.useState({
    patient: null,
    person: null,
    service: null,
    date: moment().format("YYYY-MM-DD"),
    dose: '',
  }); // form data


	return (
    <>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">LAST NAME</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl fullWidth style={{marginBottom: "20px"}}> {/* gender and birthday */}
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            style={{width: "90%"}}
          >
            <MenuItem value="patient">Male</MenuItem>
            <MenuItem value="person">Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={1} style={{width: "90%", marginRight: "40px"}}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="YYYY-MM-DD"
              // value={value}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div style={{display: "flex"}}> {/* phone and age */}
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">PHONE</InputLabel>
          <Input type="number" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}} disabled>
          <InputLabel htmlFor="my-input">AGE</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">ADDRESS</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">EMAIL</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">CIN</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">POIDS</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "50px"}} spacing={2} direction="row">
        <Button variant="outlined" fullWidth="true">Cancel</Button>
        <Button variant="contained" fullWidth="true">Add Traitement</Button>
      </Stack>
    </>
  );
}

export default CreatePatient;