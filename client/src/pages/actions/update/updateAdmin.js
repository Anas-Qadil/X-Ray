import React, { useEffect } from "react"
import Autocomplete from '@mui/material/Autocomplete';
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
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { getAdmin, updateAdminData } from "../../../api/update";


const UpdateAdmin = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const navigate = useNavigate();
  const [error, setError] = React.useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    cin: false,
    phone: false,
    email: false,
  });

  const [admin, setAdmin] = React.useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    cin: "",
    phone: "",
    email: "",
  });

  const updateAdmin = async () => {
    try {
      let checker = 0;
      if (!admin.username)
      {
        setError({...error, username: true});
        checker = 1;
      }

      if (checker)
        return enqueueSnackbar("Please check your inputs", {variant: "error"});

      const res = await updateAdminData(token, admin);
      if (res.status !== 200)
        return enqueueSnackbar("Error updating admin", {variant: "error"});
      
      enqueueSnackbar("Admin updated successfully", {variant: "success"});
      navigate(`/${role}`);
    } catch (e) {
      enqueueSnackbar("Error updating admin", {variant: "error"})
    }
  }

  const getAdminData = async () => {
    try {
      const res = await getAdmin(token);
      if (res.status !== 200)
        return enqueueSnackbar("Error getting admin data", {variant: "error"})
      setAdmin(res.data.data);
    } catch (e) {
      enqueueSnackbar("Error getting admin data", {variant: "error"})
    }
  }

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.username} >Username</InputLabel>
          <Input type="text" id="my-input" 
            error={error.username}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={admin.username}
            onChange={(e) => {
              setError({...error, username: false});
              setAdmin({...admin, username: e.target.value})}
            }
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Password</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={admin.password}
            onChange={(e) => {
              setError({...error, password: false});
              setAdmin({...admin, password: e.target.value})}
            }
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.firstName} >FIRST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.firstName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={admin.firstName}
            onChange={(e) => {
              setError({...error, firstName: false});
              setAdmin({...admin, firstName: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.lastName}>LAST NAME</InputLabel>
          <Input type="text" id="my-input" 
            error={error.lastName}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={admin.lastName}
            onChange={(e) => {
              setError({...error, lastName: false});
              setAdmin({...admin, lastName: e.target.value})}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone} >PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}} 
            value={admin.phone}
            onChange={(e) => {
              setError({...error,
                phone: false,
              });
              setAdmin({...admin, phone: e.target.value})}
            }
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.email}>EMAIL</InputLabel>
          <Input type="text" id="my-input" 
            error={error.email}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={admin.email}
            onChange={(e) => {
              setError({...error,
                email: false,
              });
              setAdmin({...admin, email: e.target.value})}
            }
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button variant="contained" onClick={updateAdmin} fullWidth>Update Admin</Button>
      </Stack>
    </div>
  )
}

export default UpdateAdmin;