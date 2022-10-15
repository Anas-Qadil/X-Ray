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

const Admin = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = React.useState(true);
  const token = useSelector(state => state?.data?.token);
  const labels = ["Date", "CIN", "Service", "Examen", "Equipement", "Hopital", "Dose"]
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAllTraitement = async () => {
    try {
      const res = await getAllTraitementApi(token);
      console.log(res.data);
      setData(res?.data);
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }


  useEffect(() => {
    getAllTraitement();
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
          <Chart title="Last Year (Doses)" aspect={2.6 / 1} />
        </div>
      </div>
    </div>
  );
}

export default Admin;