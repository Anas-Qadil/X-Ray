import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Hospital = () => {
  return (
    <div className="home">
      <Sidebar role="hospital" />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets" style={{ width: "32.4%" }} >
          <Widget type="user" dose={3}/>
        </div>
        <div className="charts"> 
          <Featured user={[]} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={[]} />
        </div>
      </div>
    </div>
  );
}

export default Hospital;