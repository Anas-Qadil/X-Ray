import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";

const Hospitals = ({role}) => {

  const data = [{
    id: 1,
    data: "01/01/2021",
    cin: "12345678",
    service: "Vaccination",
    examen: "Covid-19",
    equipement: "Pfizer",
    hospital: "CHU",
    dose: 1,
  }]

	return (
	<div className="home">
	  <Sidebar role={role} />
	  <div className="homeContainer">
      <Navbar />
      <div className="listContainer">
          <div className="listTitle">[Admin] Hospitals</div>
          <Table data={data} />
        </div>
	  </div>
	</div>
  );
}

export default Hospitals;