import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Company = () => {

  const labels = ["Date", "CIN", "Service", "Examen", "Equipement", "Hopital", "Dose"]

  return (
    <div className="home">
      <Sidebar role="company" />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" dose={3}/>
          <Widget type="yearly" dose={3}/>
          <Widget type="monthly" dose={3}/>
          <Widget type="weekly" dose={3}/>
        </div>
        <div className="charts"> 
          <Featured user={[]} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={[]} labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default Company;