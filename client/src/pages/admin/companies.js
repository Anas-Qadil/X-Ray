import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { getAllCompanies } from "../../api/servicesApi";
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Companies = ({role}) => {

  const token = useSelector(state => state?.data?.token);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const labels = ["ID", "Region", "Ville", "Designation", "Phone", "Email", "Action"];

  const getCompanies = async () => {
    try {
      const companiesData = [];
      const res = await getAllCompanies(token, search);
      let i = 0;
      res?.data?.data?.forEach((company) => {
        i++;
        companiesData.push({
          id: i,
          region: company.region,
          ville: company.ville,
          designation: company.designation,
          phone: company.phone,
          email: company.email,
          action: <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        });
      });
      setCompanies(companiesData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompanies();
  }, [search]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
        <div className="listTitle">[{role}] Companies</div>
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
        <Table data={companies} labels={labels} />
      </div>
	  </div>
	</div>
  );
}

export default Companies;