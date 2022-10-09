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
import { getPatientDoses } from "../../api/servicesApi";
import { removeData } from "../../store/index";
import { useDispatch } from "react-redux";

const Patient = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dose, setDose] = useState();
  const [doseData, setDoseData] = useState([]);
  // get user data from redux store
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  // get patient doses
  const getDoses = async () => {
   try {
     const res = await getPatientDoses(token, user?.patient?._id);
      setDoseData(res.data);
      setDose(res.data.doses);
   } catch (error) {
    alert('patient ' + error.message);
   }
  }
  // check if user is logged in
  useEffect(() => {
    if (token && user?.role === 'patient')
      getDoses();
    setLoading(false);
  }, [user]);

  const labels = ["Date", "CIN", "Service", "Examen", "Equipement", "Hopital", "Dose"]

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role="patient" />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets" >
          <Widget type="user" dose={dose}/>
          <Widget type="yearly" dose={dose}/>
          <Widget type="monthly" dose={dose}/>
          <Widget type="weekly" dose={dose}/>
        </div>
        <div className="charts"> 
          <Featured user={user?.patient} />
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

export default Patient;