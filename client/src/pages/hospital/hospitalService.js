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

const HospitalService = ({role}) => {

  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [hospitalSearch, setHospitalSearch] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(true);
  const token = useSelector(state => state?.data?.token);
  const labels = ["ID", "Name", "Equipement", "Examen", "Protocol", "Hospital Designation", "Hospital Region"];
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
      res?.data?.data?.map((service) => {
        i++;
        let obj = {
          id: i,
          _id: service._id,
          name: service.name,
          equipement: service.equipment,
          examen: service.examen, 
          protocol: service.protocol,
          hospital: service.hospital?.designation,
          region: service.hospital?.region,
        }
        if (role === "admin") {
          obj.action = ( <IconButton onClick={() => checkDelete(service?._id)} aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>)
        }
        servicesData.push(obj);
      });
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
	  <div className="homeContainer">
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
            <TextField id="standard-basic" label="Hospital Search" variant="standard" 
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
        <Model open={open} setOpen={setOpen} deleteThis={deleteService} id={id} />
        <Table data={data} labels={labels} DataLoading={dataLoading} />
      </div>
	  </div>
	</div>
  );
}

export default HospitalService;