import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { getAllCompanies } from "../../api/servicesApi";
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack'
import { deleteCompanyAPI } from '../../api/servicesApi'
import Model from "../../components/popups/index";
import validateSearchInput from "../../utils/searchValidate";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material';
import ReactToPrint from "react-to-print";

const Companies = ({role}) => {

  const { enqueueSnackbar } = useSnackbar();

  const [printStyle, setPrintStyle] = React.useState(true);
  const [printState, setPrintState] = React.useState(false);
  const [csvPrintData, setCsvPrintData] = React.useState([]);
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
  const [companies, setCompanies] = useState([]);
  const labels = ["ID", "Created At", "Designation", "Region", "City", "Address", "Phone", "Email", "Action"];
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const getCompanies = async () => {
    try {
      if (!validateSearchInput(search)) {
        enqueueSnackbar('Invalid Search Input', {variant: 'error'})
        return;
      }
      const companiesData = [];
      const dataToPrint = [];
      const res = await getAllCompanies(token, search);
      let i = 0;
      res?.data?.data?.forEach((company) => {
        i++;
        companiesData.push({
          id: i,
          _id: company._id,
          createdAt: moment(company.createdAt).format("YYYY-MM-DD HH:mm"),
          designation: company.designation,
          region: company.region,
          ville: company.ville,
          address: company.address,
          phone: company.phone,
          email: company.email,
          action: <IconButton onClick={() => checkDelete(company?._id)} aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        });
        let objToPrint = {
          id: i,
          createdAt: moment(company.createdAt).format("YYYY-MM-DD HH:mm"),
          designation: company.designation,
          region: company.region,
          city: company.ville,
          address: company.address,
          phone: company.phone,
          email: company.email,
        }
        dataToPrint.push(objToPrint);
      });
      setCsvPrintData(dataToPrint);
      setCompanies(companiesData);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const deleteCompany = async (id) => {
    try {
      // let res;
      const res = await deleteCompanyAPI(token, id);
      if (res.status === 200) {
        enqueueSnackbar('Company Deleted Successfully', {variant: 'success'})
        getCompanies();
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
    getCompanies();
  }, [search]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer"
      style={{ width: "100%", height: "100vh", overflow: "auto" }}
    >
      {/* <Navbar /> */}
      <div className="listContainer">
        <div className="listTitle">Companies</div>
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteCompany} id={id} />
        <div  ref={componentRef} 
          style={{
            width: "100%",
          }}
        >
          <Table style={printStyle} data={companies} labels={labels} DataLoading={dataLoading} />
        </div>
      </div>
	  </div>
	</div>
  );
}

export default Companies;
