import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { checkCompany } from "../../utils/checkCompany";
import { signUpCompany } from "../../api/authApi/signUp";
import { useSnackbar } from 'notistack'

const CreateCompany = ({role}) => {
  
  const { enqueueSnackbar } = useSnackbar()
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const [error, setError] = useState({
    username: false,
    password: false,
    region: false,
    address: false,
    ville: false,
    designation: false,
    email: false,
    phone: false,
  });
  const [companyData, setCompanyData] = useState({
    username: '',
    password: '',
    region: '',
    ville: '',
    address: '',
    designation: '',
    email: '',
    phone: '',
  });


  const addCompany =  async () => {
    try {
      setBtnLoading(true);
      if (!checkCompany(companyData, setError)) {
        const res = await signUpCompany(token, companyData);
        if (res.status === 200 || res.status === 201) {
          enqueueSnackbar('Company was created successfully', {variant: 'success'})
          navigate(`/${role}`);
        }
      } else {
        enqueueSnackbar('Please Check your inputs', {variant: 'error'})
      }
      setBtnLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
      setBtnLoading(false);
    }
  }

	return (
		<>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.designation}>Designation</InputLabel>
          <Input type="text" id="my-input" 
            error={error.designation}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={companyData.designation}
            onChange={(e) => {
              setError({
                ...error,
                designation: false,
              });
              setCompanyData({...companyData, designation: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.address}>Address</InputLabel>
          <Input type="text" id="my-input" 
            error={error.address}
            aria-describedby="my-helper-text" 
            style={{width: "95%"}} 
            value={companyData.address}
            onChange={(e) => {
              setError({
                ...error,
                address: false,
              });
              setCompanyData({...companyData, address: e.target.value})}}
          />
        </FormControl>
      </div>
      <div style={{display: "flex"}}>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.region}>REGION</InputLabel>
          <Input type="text" id="my-input" 
            error={error.region}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={companyData.region}
            onChange={(e) => {
              setError({
                ...error,
                region: false,
              });
              setCompanyData({...companyData, region: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.ville}>City</InputLabel>
          <Input type="text" id="my-input" 
            error={error.ville}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={companyData.ville}
            onChange={(e) => {
              setError({
                ...error,
                ville: false,
              });
              setCompanyData({...companyData, ville: e.target.value})}}
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
            value={companyData.email}
            onChange={(e) => {
              setError({
                ...error,
                email: false,
              });
              setCompanyData({...companyData, email: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.phone}>PHONE</InputLabel>
          <Input type="number" id="my-input" 
            error={error.phone}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={companyData.phone}
            onChange={(e) => {
              setError({
                ...error,
                phone: false,
              });
              setCompanyData({...companyData, phone: e.target.value})}}
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
            value={companyData.username}
            onChange={(e) => {
              setError({
                ...error,
                username: false,
              });
              setCompanyData({...companyData, username: e.target.value})}}
          />
        </FormControl>
        <FormControl color="primary" fullWidth style={{marginBottom: "20px"}}>
          <InputLabel htmlFor="my-input" error={error.password}>Password</InputLabel>
          <Input type="text" id="my-input" 
            error={error.password}
            aria-describedby="my-helper-text" 
            style={{width: "90%"}}
            value={companyData.password}
            onChange={(e) => {
              setError({
                ...error,
                password: false,
              });
              setCompanyData({...companyData, password: e.target.value})}}
          />
        </FormControl>
      </div>
      <Stack style={{marginTop: "10px"}} spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate(`/${role}`)} fullWidth>Cancel</Button>
        <Button disabled={btnLoading} variant="contained" onClick={addCompany} fullWidth>
          Add Company
        </Button>
      </Stack>
		</>
  );
}

export default CreateCompany;