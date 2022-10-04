import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Sidebar from "../../components/person/sidebar/Sidebar";
import Widget from "../../components/person/widget/Widget";
import Featured from "../../components/person/featured/Featured";
import Chart from "../../components/person/chart/Chart";
import Table from "../../components/person/table/Table";
import Navbar from "../../components/person/navbar/Navbar";
import "./home.scss";
import { getPatientDoses } from "../../api/servicesApi";
import { removeData } from "../../store/index";
import { useDispatch } from "react-redux";

const Person = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // get user data from redux store
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  // console.log(user);
  // get patient doses

  // check if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    if (user?.role !== 'person') {
      navigate("/");
    }
    setLoading(false);
  }, [])

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role={'person'}/>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets"
          style={{
            width: "32.4%",
          }}
        >
          <Widget type="user" dose={100}/>
        </div>
        <div className="charts"> 
          <Featured user={user.person} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={[]} /> {/* pass latest 5 services */}
        </div>
      </div>
    </div>
  );
}

export default Person;