import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField  } from '@mui/material';
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllHospitals, deleteHospitalAPI } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'
import Model from "../../components/popups/index";
import validateSearchInput from "../../utils/searchValidate";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material';
import ReactToPrint from "react-to-print";


const Hospitals = ({role}) => {

  const { enqueueSnackbar } = useSnackbar();

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
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const labels = ["ID", "Created At", "Designation", "Region", "City", "Statut", "Phone", "Email", "Action"]
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const getHospitals = async () => {
    try {
      if (!validateSearchInput(search)) {
        enqueueSnackbar('Invalid Search Input', {variant: 'error'})
        return;
      }
      const hospitalsData = [];
      const dataToPrint = [];
      const res = await getAllHospitals(token, search);
      let i = 0;
      res?.data?.data?.forEach((hospital) => {
        i++;
        hospitalsData.push({
          id: i,
          _id: hospital._id,
          createdAt: moment(hospital.createdAt).format("YYYY-MM-DD HH:mm"),
          designation: hospital.designation,
          region: hospital.region,
          ville: hospital.ville,
          statut: hospital.statut,
          phone: hospital.phone,
          email: hospital.email,
          __address: hospital.address,
          action: <IconButton style={{zIndex: "100"}} onClick={() => checkDelete(hospital?._id)} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
        });

        dataToPrint.push({
          id: i,
          createdAt: moment(hospital.createdAt).format("YYYY-MM-DD HH:mm"),
          designation: hospital.designation,
          region: hospital.region,
          city: hospital.ville,
          statut: hospital.statut,
          phone: hospital.phone,
          email: hospital.email,
          address: hospital.address,
        });
      });
      setCsvPrintData(dataToPrint);
      setHospitals(hospitalsData);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const deleteHospital = async (id) => {
    try {
      const res = await deleteHospitalAPI(token, id);
      if (res.status === 200) {
        enqueueSnackbar("Deleted Successfully", {variant: 'success'})
        getHospitals();
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
    getHospitals();
  }, [search]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer"
      style={{ width: "100%", height: "100vh", overflow: "auto" }}
    >
      {/* <Navbar /> */}
      <div className="listContainer">
        <div className="listTitle">Health institution</div>
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteHospital} id={id} />
        <div
          ref={componentRef} 
          style={{
            width: "100%",
          }}
        >
          <Table style={printStyle} data={hospitals} labels={labels} DataLoading={dataLoading} />
        </div>
      </div>
	  </div>
	</div>
  );
}

export default Hospitals;