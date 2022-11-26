import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import "./home.scss";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { getPersonTraitements } from "../../api/servicesApi";
import moment from 'moment';
import { useSnackbar } from 'notistack'
import { getGraphData } from "../../api/servicesApi";


const Person = () => {

  const { enqueueSnackbar } = useSnackbar()

  const labels = ["Date", "CIN", "Service", "Examination", "Equipement", "Hopital", "Dose"]
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [personTraitementData, setPersonTraitementData] = useState({});
  const [mainPageData, setMainPageData] = useState([]);
  const [DataLoading, setDataLoading] = useState(true);
  const [graph, setGraph] = useState({});

  const getDoses = async () => {
    try {
      const res = await getPersonTraitements(token, user?.person?._id);
      if (res.status === 200) {
        if (res.data.lastyearDose >= 18)
          enqueueSnackbar("You Have exceeded The Does Rate Limit.", { variant: 'warning' });
        setPersonTraitementData(res?.data);
        formatData(res?.data?.traitements);
      }
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e.response.data.message || 'Something Went Wrong..', {variant: 'error'})
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
        cin: traitements[size - i]?.person?.cin,
        service: traitements[size - i]?.service?.name,
        examen: traitements[size - i]?.service?.examen,
        equipement: traitements[size - i]?.service?.equipment,
        hopital: traitements[size - i]?.service?.hospital?.name,
        dose: traitements[size - i]?.dose,
      }
      data.push(formatedData);
      i++;
    }
    setMainPageData(data);
  }

  const getGraph = async () => {
    try {
      const res = await getGraphData(token);
      if (res.status === 200) {
        setGraph(res.data.data);
      } else {
        enqueueSnackbar(res?.data?.message || 'Something Went Wrong..', {variant: 'error'})
      }
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    if (user?.person?._id)
      getDoses();
    getGraph();
    setLoading(false);
  }, [user])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="home">
      <Sidebar role="person" />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" dose={personTraitementData?.totalDose} DataLoading={DataLoading}/>
          <Widget type="yearly" dose={personTraitementData?.lastyearDose} DataLoading={DataLoading}/>
          <Widget type="monthly" dose={personTraitementData?.lastMonthDose} DataLoading={DataLoading}/>
          <Widget type="weekly" dose={personTraitementData?.lastWeekDose} DataLoading={DataLoading}/>
        </div>
        <div className="charts"> 
          <Chart title="Last Year (Doses)" aspect={2.6 / 1} color={personTraitementData?.lastyearDose >= 18 ? "#df4759" : "#00A7E1"} graph={graph} />
        </div>
      </div>
    </div>
  );
}

export default Person;