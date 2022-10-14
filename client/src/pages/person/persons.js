import React, { useEffect } from "react";
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
import { getPersons, getPersonForCompanyRole } from "../../api/servicesApi";

const Persons = ({role}) => {

  const token = useSelector(state => state?.data?.token);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  let labels;
  if (role === "admin") 
	  labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Secteur", "Fonction", "Type", "action"]
  else 
	  labels = ["ID", "CreatedAt", "First Name", "Last Name", "CIN", "Gender", "Birth Date", "Age", "Poids", "Address", "Phone", "Email", "Secteur", "Fonction", "Type"]

  const getAllPersons = async () => {
    try {
      let res;
      let i = 0;
      let PersonsData = [];
      if (role === "admin")
      {
        res = await getPersons(token, search);
        console.log(res);
      } else {
        res = await getPersonForCompanyRole(token, search);
      }
      res?.data?.data?.map((person) => {
        i++;
        let obj = {
          id: i,
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
        if (role === "admin") {
          obj.action = ( <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
            </IconButton>);
        }
        PersonsData.push(obj);
      });
      setData(PersonsData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPersons();
  }, [search]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
        <div className="listTitle">[{role}] Latest Operations</div>
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
        <Table data={data} labels={labels} />
      </div>
	  </div>
	</div>
  );
}

export default Persons;