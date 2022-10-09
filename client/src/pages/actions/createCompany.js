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


const CreateCompany = ({role}) => {
  
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
          <InputLabel htmlFor="my-input">REGION</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">VILLE</InputLabel>
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
          <InputLabel htmlFor="my-input">DESIGNATION</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            // onChange={(e) => setTraitementData({...traitementData, dose: e.target.value})}
            // value={traitementData.dose}
          />
        </FormControl>
        <FormControl color="primary" fullWidth="true" style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input">PHONE</InputLabel>
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
          <InputLabel htmlFor="my-input">EMAIL</InputLabel>
          <Input type="text" id="my-input" 
            aria-describedby="my-helper-text" 
            style={{width: "95%"}} 
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

export default CreateCompany;