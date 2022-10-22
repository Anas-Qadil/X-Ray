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

const Companies = ({role}) => {

  const { enqueueSnackbar } = useSnackbar();

  const token = useSelector(state => state?.data?.token);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const labels = ["ID", "Region", "Ville", "Designation", "Phone", "Email", "Action"];
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const getCompanies = async () => {
    try {
      const companiesData = [];
      const res = await getAllCompanies(token, search);
      let i = 0;
      res?.data?.data?.forEach((company) => {
        i++;
        companiesData.push({
          id: i,
          _id: company._id,
          region: company.region,
          ville: company.ville,
          designation: company.designation,
          phone: company.phone,
          email: company.email,
          action: <IconButton onClick={() => checkDelete(company?._id)} aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        });
      });
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
	  <div className="homeContainer">
      {/* <Navbar /> */}
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteCompany} id={id} />
        <Table data={companies} labels={labels} DataLoading={dataLoading} />
      </div>
	  </div>
	</div>
  );
}

export default Companies;
