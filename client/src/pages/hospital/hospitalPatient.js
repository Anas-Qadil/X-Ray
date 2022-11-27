import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { useLocation } from "react-router";
import { getPatients } from "../../api/servicesApi";
import { useSelector } from 'react-redux'
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPatientForHospitlRole, deletePatientAPI } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'
import Model from "../../components/popups/index";
import validateSearchInput from "../../utils/searchValidate";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material';
import ReactToPrint from "react-to-print";


const HospitalPatient = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const [printStyle, setPrintStyle] = React.useState(true);
  const [csvPrintData, setCsvPrintData] = React.useState([]);
  const [printState, setPrintState] = React.useState(false);
  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const reactToPrintTrigger = React.useCallback(() => {
    return (
        <Button variant="contained" style={{
          width: "100%",
        }}
        >Print</Button>
    );
  }, []);

  const token = useSelector(state => state?.data?.token);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(true);
  const location = useLocation();

  // model
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  let labels;
  if (location.pathname === "/persons") 
    labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Date of birth", "Age", "Weight", "Address", "Phone", "Email", "Sector", "Fonction", "Type"]
  else 
    labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Date of birth", "Age", "Weight", "Address", "Phone", "Email"]
  if (role === "admin") labels.push("Action");

  const getPatinets = async () => {
    try {
      if (!validateSearchInput(search)) {
        enqueueSnackbar('Invalid Search Input', {variant: 'error'})
        return;
      }
      const patientsData = [];
      let res;
      let i = 0;
      if (role === "admin") {
        res = await getPatients(token, search);
      } else if (role === "hospital") {
        res = await getPatientForHospitlRole(token, search);
      }
      const dataToPrint = [];
      res?.data?.data?.map((patient) => {
        i++;
        let obj = {
          id: i,
          _id: patient._id,
          createdAt: moment(patient.createdAt).format("YYYY-MM-DD HH:mm"),
          firstName: patient.firstName,
          lastName: patient.lastName,
          cin: patient.cin,
          gender: patient.gender,
          birthDate: moment(patient.birthDate).format("YYYY-MM-DD"),
          age: patient.age,
          poids: patient.poids,
          address: patient.address,
          phone: patient.phone,
          email: patient.email,
        }
        if (role === "admin") {
          obj.action = ( <IconButton onClick={() => checkDelete(patient?._id)} aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>)
        }
        patientsData.push(obj);
        const objToPrint = {
          id: i,
          createdAt: moment(patient.createdAt).format("YYYY-MM-DD HH:mm"),
          firstName: patient.firstName,
          lastName: patient.lastName,
          cin: patient.cin,
          gender: patient.gender,
          DateOfBirth: moment(patient.birthDate).format("YYYY-MM-DD"),
          age: patient.age,
          Weight: patient.poids,
          address: patient.address,
          phone: patient.phone,
          email: patient.email,
        }
        dataToPrint.push(objToPrint);
      });
      setCsvPrintData(dataToPrint);
      setData(patientsData);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const deletePatient = async (id) => {
    try {
      const res = await deletePatientAPI(token, id);
      if (res.status === 200) {
        enqueueSnackbar('Patient Deleted Successfully', {variant: 'success'})
        getPatinets();
      }
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const checkDelete = (id) => {
    setId(id);
    setOpen(true);
  }

  useEffect(() => {
    getPatinets();
  }, [search]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer"
      style={{ width: "100%", height: "100vh", overflow: "auto" }}
    >
      {/* <Navbar /> */}
      <div className="listContainer">
        <div className="listTitle">Patients</div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <TextField id="standard-basic" label="Search" variant="standard" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}/>
        </div>
        <br />
        {!printState && 
            <Button sx={{ ':hover': { bgcolor: '#1976d2', color: 'white' },bgcolor: '#1976d2' }}
              style={{ color: "white",
              width: "100%",
              }}
              onClick={() => {
                setPrintState(true);
                setPrintStyle(false);
              }}
            >
              Print
            </Button>
          }
          {printState && <div style={{ display: "flex", width: "100%", backgroundColor: "#f5f5f5", }}>
            <ReactToPrint
              content={reactToPrintContent}
              trigger={reactToPrintTrigger}
              style={{
                width: "95%",
                marginRight: "5%",
              }}
            />
            <CSVLink data={csvPrintData} style={{
              width: "95%",
              backgroundColor: "#0ba600",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "5%",
              color: "white",
            }} >Print as csv</CSVLink>
          </div>}
          <hr />
        <br />
        <Model open={open} setOpen={setOpen} deleteThis={deletePatient} id={id} />
        <div
          ref={componentRef} 
          style={{
            width: "100%",
          }}
        >
          <Table style={printStyle} data={data} labels={labels} DataLoading={dataLoading} />
        </div>
      </div>
	  </div>
	</div>
  );
}

export default HospitalPatient;