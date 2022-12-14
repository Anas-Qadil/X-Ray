import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from 'react-redux'
import moment from "moment";
import Loader from "../../components/loader";
import { getCompanyServices } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'
import { getGraphData } from "../../api/servicesApi";


const Company = () => {
  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mainPageData, setMainPageData] = useState([]);
  const [graph, setGraph] = useState({});

  const labels = ["Date", "CIN", "Service", "Examination", "Equipement", "Hopital", "Dose"]
  
  const getServices = async () => {
    try {
      const res = await getCompanyServices(token);
      setData(res?.data);
      formatData(res?.data.data);
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
        setGraph(res?.data?.data);
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
  console.log(data);
  useEffect(() => {
    if (token) {
      getServices();
      getGraph();
    } 
    setLoading(false);
  }, [token]);
  if (loading) return <Loader />

  return (
    <div className="home">
      <Sidebar role="company" />
      <div className="homeContainer"
        style={{ width: "100%", height: "100vh", overflow: "auto" }}
      >
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" dose={data.totalDose} DataLoading={dataLoading} />
          <Widget type="yearly" dose={data.lastyearDose} DataLoading={dataLoading} />
          <Widget type="monthly" dose={data.lastMonthDose} DataLoading={dataLoading} />
          <Widget type="weekly" dose={data.lastWeekDose} DataLoading={dataLoading} />
        </div>
        <div className="charts"> 
          {/* <Featured user={user?.company} role="company" /> */}
          <Chart title="Last Year (Doses)" aspect={2.6 / 1} graph={graph} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Operations</div>
          <Table data={mainPageData} labels={labels} />
        </div> */}
      </div>
    </div>
  );
}

export default Company;