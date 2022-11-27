import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux'
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPersons, getPersonForCompanyRole, deletePersonAPI, getHospitalPersons } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'
import Model from "../../components/popups/index";
import validateSearchInput from "../../utils/searchValidate";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material';
import ReactToPrint from "react-to-print";


const Persons = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

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
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  let labels;
  if (role === "admin") 
	  labels = ["ID", "CreatedAt", "First name", "Last name", "CIN", "Gender", "Email", "Age", "Healthcare Institution/Company", "Phone", "Activity Service", "Fonction", "Type", "Action"]
  else 
	  labels = ["ID", "CreatedAt", "First name", "Last name", "CIN", "Gender", "Email", "Age", "Healthcare Institution/Company", "Phone", "Activity Service", "Fonction", "Type"]

  const getAllPersons = async () => {
    try {
      if (!validateSearchInput(search)) {
        enqueueSnackbar('Invalid Search Input', {variant: 'error'})
        return;
      }
      let res;
      let i = 0;
      let PersonsData = [];
      if (role === "admin")
      {
        res = await getPersons(token, search);
      } else if (role === "hospital") {
        res = await getHospitalPersons(token, search);
      } 
      else {
        res = await getPersonForCompanyRole(token, search);
      }

      const dataToPrint = [];

      res?.data?.data?.map((person) => {
        i++;
        
        let obj = {
          id: i,
          _id: person._id,
          createdAt: moment(person.createdAt).format("YYYY-MM-DD HH:mm"),
          firstName: person.firstName,
          lastName: person.lastName,
          cin: person.cin,
          gender: person.gender,
          __birthDate: moment(person.birthDate).format("YYYY-MM-DD"),
          email: person.email,
          age: person.age,
          __poids: person.poids,
          healthCareInstitution: person?.hospital?.designation || person?.company?.designation,
          phone: person.phone,
          secteur: person.secteur,
          fonction: person.fonction,
          type: person.type,
          __address: person.address,
          __email: person.email,
        }
        if (person.company) {
          obj._company = person.company.designation;
        } else if (person.hospital) {
          obj._hospital = person.hospital.designation;
        }
        if (role === "admin") {
          obj.action = ( <IconButton onClick={() => checkDelete(person?._id)} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>);
        }
        PersonsData.push(obj);

        const objToPrint = {
          id: i,
          createdAt: moment(person.createdAt).format("YYYY-MM-DD HH:mm"),
          firstName: person.firstName,
          lastName: person.lastName,
          CIN: person.cin,
          Gender: person.gender,
          Email: person.email,
          Age: person.age,
          HealthCareInstitution: person?.hospital?.designation || person?.company?.designation,
          phone: person.phone,
          ActivityService: person.secteur,
          Fonction: person.fonction,
          Type: person.type,
        }
        dataToPrint.push(objToPrint);
      });

      setCsvPrintData(dataToPrint);
      setData(PersonsData);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }
  const deletePerson = async (id) => {
    try {
      const res = await deletePersonAPI(token, id);
      if (res.status === 200) {
        enqueueSnackbar("Person Deleted Successfully", {variant: 'success'})
        getAllPersons();
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
    getAllPersons();
  }, [search]);


	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer"
      style={{ width: "100%", height: "100vh", overflow: "auto" }}
    >
      {/* <Navbar /> */}
      <div className="listContainer">
        <div className="listTitle">Professionals Healthcare</div>
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
        <Model open={open} setOpen={setOpen} deleteThis={deletePerson} id={id} />
        <div  ref={componentRef} 
          style={{
            width: "100%",
          }}
        >
          <Table style={printStyle} data={data} labels={labels} DataLoading={dataLoading} style={printStyle} />
        </div>
      </div>
	  </div>
	</div>
  );
}

export default Persons;