import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { TextField } from '@mui/material';
import { getAllServicesApi, getHospitalServices, getAllHospitalServices } from "../../api/servicesApi";
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux'

const HospitalService = ({role}) => {

  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [hospitalSearch, setHospitalSearch] = React.useState("");
  const token = useSelector(state => state?.data?.token);
  const labels = ["ID", "Name", "Equipement", "Examen", "Protocol", "Hospital Designation", "Hospital Region"];
  if (role === "admin") labels.push("Action");

  const getServices = async () => {
    try {
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
          name: service.name,
          equipement: service.equipment,
          examen: service.examen, 
          protocol: service.protocol,
          hospital: service.hospital.designation,
          region: service.hospital.region,
        }
        if (role === "admin") {
          obj.action = ( <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>)
        }
        servicesData.push(obj);
      });
      setData(servicesData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, [search, hospitalSearch]);

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
        <div className="listTitle">[{role}] Latest Operations</div>
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
        <Table data={data} labels={labels} />
      </div>
	  </div>
	</div>
  );
}

export default HospitalService;