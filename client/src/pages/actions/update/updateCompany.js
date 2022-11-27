import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import { getCompanies, getUserCompany } from "../../../api/servicesApi";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { checkUpdateCompany } from "../../../utils/checkCompany";
import { updateCompanyData } from "../../../api/update/index";
import { useDispatch } from "react-redux";
import { setData } from "../../../store";

const UpdateCompany = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate();
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.user);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    username: false,
    password: false,
    region: false,
    ville: false,
    address: false,
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

  const [companies, setCompanies] = useState([]);

  const getCompanyUser = async (id) => {
    try {
      const res = await getUserCompany(token, id);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching hospital user", {variant: "error"});
      setCompanyData({
        ...companyData,
        username: res.data?.data?.username,
      });
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getAllCompanies = async () => {
    try {
      const res = await getCompanies(token);
      if (res.status !== 200)
        return enqueueSnackbar("Error while fetching hospitals", {variant: "error"});
      const options = [];
      res.data?.data?.map((company) => {
        options.push({
          label: company.designation + ' - ' + company.region,
          data: company,
        })
      });
      setCompanies(options);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const updateCompany = async () => {
    try {
      if (checkUpdateCompany(companyData, setError))
        return enqueueSnackbar("Please fill all fields", {variant: "error"});
      const res = await updateCompanyData(token, companyData);
      if (res.status !== 200)
        return enqueueSnackbar("Error while updating company", {variant: "error"});
      enqueueSnackbar("Company updated successfully", {variant: "success"});
      if (role === "company") {
        const newUser = Object.assign({}, user);
        newUser.username = companyData.username;
        newUser.company = companyData;
        delete newUser.company.password;
        dispatch(setData({ user: newUser }));
      }
      navigate(`/${role}`);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    if (role === "company") {
      const newOBJ = Object.assign({}, user.company);
      newOBJ.username = user.username;
      delete newOBJ.__v;
      setCompanyData(newOBJ);
    } else {
      if (role !== 'admin') {
        navigate(`/${role}`);
      }
      getAllCompanies();
      if (companyData._id)
        getCompanyUser(companyData._id);
    }
  }, [companyData._id]);

	return (
	<div>
    {role !== "company" && <Autocomplete
      style={{marginBottom: "20px"}}
      disablePortal
      id="combo-box-demo"
      options={companies}
      onChange={(e, value) => {
      //   setError({ ...error, person: false });
        if (value === null) {
          setCompanyData({
            username: '',
            password: '',
            region: '',
            ville: '',
            designation: '',
            address: '',
            email: '',
            phone: '',
          });
          return;
        }
        setCompanyData({
          ...companyData,
          _id: value.data._id,
          region: value.data.region,
          ville: value.data.ville,
          address: value.data.address,
          designation: value.data.designation,
          email: value.data.email,
          phone: value.data.phone,
        });
      }}
      renderInput={(params) => <TextField {...params} label="Companies" />}
    />}
        <div style={{display: "flex"}}>
      <FormControl disabled={role === "company" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
        <InputLabel htmlFor="my-input" error={error.designation}>DESIGNATION</InputLabel>
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
            if (role !== "company")
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
      <FormControl disabled={role === "company" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
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
            if (role !== "company")
              setCompanyData({...companyData, region: e.target.value})}}
        />
      </FormControl>
      <FormControl disabled={role === "company" && true} color="primary" fullWidth style={{marginBottom: "20px"}}>
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
            if (role !== "company")
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
      <Button variant="contained" onClick={updateCompany} fullWidth>Update Company</Button>
    </Stack>
	</div>
  );
}

export default UpdateCompany;