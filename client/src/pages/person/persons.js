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

const Persons = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  let labels;
  if (role === "admin") 
	  labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Secteur", "Fonction", "Type", "action"]
  else 
	  labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Secteur", "Fonction", "Type"]

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
      res?.data?.data?.map((person) => {
        i++;
        let obj = {
          id: i,
          _id: person._id,
          createdAt: moment(person.createdAt).format("YYYY-MM-DD"),
          firstName: person.firstName,
          lastName: person.lastName,
          cin: person.cin,
          gender: person.gender,
          birthDate: moment(person.birthDate).format("YYYY-MM-DD"),
          age: person.age,
          poids: person.poids,
          address: person.address,
          phone: person.phone,
          email: person.email,
          secteur: person.secteur,
          fonction: person.fonction,
          type: person.type,
        }
        if (person.company) {
          obj._company = person.company.designation;
        } else if (person.hospital) {
          obj._hospital = person.hospital.name;
        }
        if (role === "admin") {
          obj.action = ( <IconButton onClick={() => checkDelete(person?._id)} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>);
        }
        PersonsData.push(obj);
      });
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
	  <div className="homeContainer">
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
        <Model open={open} setOpen={setOpen} deleteThis={deletePerson} id={id} />
        <Table data={data} labels={labels} DataLoading={dataLoading} />
      </div>
	  </div>
	</div>
  );
}

export default Persons;