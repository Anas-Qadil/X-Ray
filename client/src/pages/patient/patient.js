import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Sidebar from "../../components/patient/sidebar/Sidebar";
import Widget from "../../components/patient/widget/Widget";
import Featured from "../../components/patient/featured/Featured";
import Chart from "../../components/patient/chart/Chart";
import Table from "../../components/patient/table/Table";
import Navbar from "../../components/patient/navbar/Navbar";
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
  // console.log(user);
  // get patient doses
  const getDoses = async () => {
   try {
     const res = await getPatientDoses(token, user?.patient?._id);
      setDoseData(res.data);
      setDose(res?.data?.doses);
   } catch (error) {
    alert('patient ' + error.message);
   }
  }

  // check if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    if (!user || user?.role !== 'patient') {
      navigate("/");
      setLoading(false);
      return ;
    }
    getDoses();
    setLoading(false);
  }, [])

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role={user.role}/>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets"
          style={{
            width: "32.4%",
          }}
        >
          <Widget type="user" dose={dose}/>
        </div>
        <div className="charts"> 
          <Featured user={user.patient} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={doseData.data} />
        </div>
      </div>
    </div>
  );
}

export default Patient;