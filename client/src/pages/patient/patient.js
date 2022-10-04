import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Patient = () => {

  const [loading, setLoading] = useState(true);
  
  // get user data from redux store
  const user = useSelector(state => state.data.data.user)
  // check if user is logged in
  const token = useSelector(state => state.data.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    setLoading(false);
  }, [token, navigate])

  if (loading) return <Loader />
  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts"> 
          <Featured user={user.patient} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Patient;