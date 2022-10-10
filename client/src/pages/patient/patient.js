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
import moment from "moment";

const Patient = () => {

  const [loading, setLoading] = useState(true);
  const [doseData, setDoseData] = useState([]);
  const [mainPageData, setMainPageData] = useState([]);

  // get user data from redux store
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);

  // get patient doses
  const getDoses = async () => {
   try {
     const res = await getPatientDoses(token, user?.patient?._id);
      // console.log(res?.data);
      formatData(res?.data?.data);
      setDoseData(res.data);
   } catch (error) {
    alert('patient ' + error.message);
   }
  }

  const formatData = (traitements) => {
    let data = [];
    let formatedData = {};
    let i = 0;
    let size = traitements?.length - 1;
    while (i < 5) {
      formatedData = {
        date: moment(traitements[size - i]?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        cin: traitements[size - i]?.patient?.cin,
        service: traitements[size - i]?.service?.name,
        examen: traitements[size - i]?.service?.examen,
        equipement: traitements[size - i]?.service?.equipment,
        hopital: traitements[size - i]?.service?.hospital?.name,
        dose: traitements[size - i]?.dose,
      }
      data.push(formatedData);
      i++;
    }
    console.log(data);
    setMainPageData(data);
  }

  useEffect(() => {
    if (user?.patient?._id)  
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
        <Widget type="user" dose={doseData?.doses}/>
          <Widget type="yearly" dose={doseData?.lastyearDose}/>
          <Widget type="monthly" dose={doseData?.lastMonthDose}/>
          <Widget type="weekly" dose={doseData?.lastWeekDose}/>
        </div>
        <div className="charts"> 
          <Featured user={user?.patient} role="patient" />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={mainPageData} labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default Patient;