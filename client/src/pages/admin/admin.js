import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Loader from "../../components/loader";
import  { getAllTraitementApi } from  "../../api/servicesApi" ;
import moment from "moment";
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { getGraphData } from "../../api/servicesApi";


const Admin = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = React.useState(true);
  const token = useSelector(state => state?.data?.token);
  const labels = ["Date", "CIN", "Service", "Examination", "Equipement", "Hopital", "Dose"];
  const [graph, setGraph] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAllTraitement = async () => {
    try {
      const res = await getAllTraitementApi(token);
      setData(res?.data);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }
  
  const getGraph = async () => {
    try {
      const res = await getGraphData(token);
      if (res.status === 200) {
        setGraph(res.data.data);
      } else {
        enqueueSnackbar(res?.data?.message || 'Something Went Wrong..', {variant: 'error'})
      }
      res.data.traitementOver18aYear?.map(item => {
        enqueueSnackbar(item.cin + " has exceeded the maximum dose limit", {variant: 'warning'})
      });
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    getAllTraitement();
    getGraph();
    setLoading(false);
  }, []);

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role="admin" />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" dose={data?.doses} DataLoading={dataLoading} />
          <Widget type="yearly" dose={data?.lastyearDose} DataLoading={dataLoading}/>
          <Widget type="monthly" dose={data?.lastMonthDose} DataLoading={dataLoading}/>
          <Widget type="weekly" dose={data?.lastWeekDose} DataLoading={dataLoading}/>
        </div>
        <div className="charts"> 
          <Chart title="Last Year (Doses)" aspect={2.6 / 1} graph={graph} />
        </div>
      </div>
    </div>
  );
}

export default Admin;