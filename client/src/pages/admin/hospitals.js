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

const Hospitals = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const labels = ["ID", "Name", "Region", "Ville", "Statut", "Designation", "Phone", "Email", "Action"]
  const [dataLoading, setDataLoading] = React.useState(true);

  // model
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const getHospitals = async () => {
    try {
      const hospitalsData = [];
      const res = await getAllHospitals(token, search);
      let i = 0;
      res?.data?.data?.forEach((hospital) => {
        i++;
        hospitalsData.push({
          id: i,
          _id: hospital._id,
          name: hospital.name,
          region: hospital.region,
          ville: hospital.ville,
          statut: hospital.statut,
          designation: hospital.designation,
          phone: hospital.phone,
          email: hospital.email,
          action: <IconButton onClick={() => checkDelete(hospital?._id)} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
        });
      });
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
        enqueueSnackbar(res.data.message, {variant: 'success'})
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
	  <div className="homeContainer">
      {/* <Navbar /> */}
      <div className="listContainer">
        <div className="listTitle">[{role}] Hospitals</div>
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteHospital} id={id} />
        <Table data={hospitals} labels={labels} DataLoading={dataLoading} />
      </div>
	  </div>
	</div>
  );
}

export default Hospitals;