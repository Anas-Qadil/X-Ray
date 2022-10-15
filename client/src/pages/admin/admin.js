import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Loader from "../../components/loader";

const Admin = () => {

  const [loading, setLoading] = React.useState(true);
  const labels = ["Date", "CIN", "Service", "Examen", "Equipement", "Hopital", "Dose"]
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setDataLoading(false);
  }, []);

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role="admin" />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" dose={3} DataLoading={dataLoading} />
          <Widget type="yearly" dose={3} DataLoading={dataLoading}/>
          <Widget type="monthly" dose={3} DataLoading={dataLoading}/>
          <Widget type="weekly" dose={3} DataLoading={dataLoading}/>
        </div>
        <div className="charts"> 
          {/* <Featured user={[]} /> */}
          <Chart title="Last Year (Doses)" aspect={2.6 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={[]} labels={labels} />
        </div> */}
      </div>
    </div>
  );
}

export default Admin;