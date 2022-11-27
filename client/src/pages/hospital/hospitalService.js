import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { getAllServicesApi, getAllHospitalServices, deleteServiceAPI } from "../../api/servicesApi";
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import Model from "../../components/popups/index";
import validateSearchInput from "../../utils/searchValidate";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material';
import ReactToPrint from "react-to-print";


const HospitalService = ({role}) => {

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

  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [hospitalSearch, setHospitalSearch] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(true);
  const token = useSelector(state => state?.data?.token);
  let labels = [];
  if (role === "hospital")
    labels = ["ID", "Created At", "Designation", "Equipement", "Examination", "Protocol"]
  else 
    labels = ["ID", "Created At", "Designation", "Equipement", "Examination", "Protocol", "Healthcare institution", "City"];

  if (role === "admin") labels.push("Action");

  // model
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const getServices = async () => {
    try {
      if (!validateSearchInput(search) || !validateSearchInput(hospitalSearch)) {
        enqueueSnackbar('Invalid Search Input', {variant: 'error'})
        return;
      }
      const servicesData = [];
      let res;
      if (role === "admin")
      {
        res = await getAllServicesApi(token, search, hospitalSearch);
      } else if (role === "hospital") {
        res = await getAllHospitalServices(token);
      }
      let i = 0;
      const dataToPrint = [];
      res?.data?.data?.map((service) => {
        i++;
        let obj = {
          id: i,
          _id: service._id,
          createdAt: moment(service.createdAt).format("YYYY-MM-DD HH:mm"),
          name: service.name,
          equipement: service.equipment,
          examen: service.examen, 
          protocol: service.protocol,
        }
        if (role !== "hospital") {
          obj.hospital = service.hospital?.designation;
          obj.region = service.hospital?.ville;
        }
        if (role === "admin") {
          obj.action = ( <IconButton onClick={() => checkDelete(service?._id)} aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>)
        }
        let csvObj = {
          id: i,
          createdAt: moment(service.createdAt).format("YYYY-MM-DD HH:mm"),
          designation: service.name,
          equipement: service.equipment,
          examination: service.examen,
          protocol: service.protocol,
        }
        dataToPrint.push(csvObj);
        servicesData.push(obj);
      });
      setCsvPrintData(dataToPrint);
      setData(servicesData);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await deleteServiceAPI(token, id);
      if (res.status === 200) {
        enqueueSnackbar('Service Deleted Successfully', {variant: 'success'})
        getServices();
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
    getServices();
  }, [search, hospitalSearch]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer"
      style={{ width: "100%", height: "100vh", overflow: "auto" }}
    >
      <div className="listContainer">
        <div className="listTitle">Services</div>
        <div style={{display: "flex" }}>
        {
          role === "admin" && (
            <>
            <TextField id="standard-basic" label="Service Search" variant="standard" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                
              }}/>
            <TextField id="standard-basic" label="Healthcare institution Search" variant="standard" 
              value={hospitalSearch}
              onChange={(e) => setHospitalSearch(e.target.value)}
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "10%"
              }}/>
            </>
            )
          }
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteService} id={id} />
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

export default HospitalService;