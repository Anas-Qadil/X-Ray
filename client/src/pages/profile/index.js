import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from 'react-redux'
import Featured from "../../components/featured/Featured";
import "./single.scss";
import MaleLogo from "../../assets/male.png"
import FemaleLogo from "../../assets/female.png"
import OtherLogo from "../../assets/other.png"
import HospitalLogo from "../../assets/hospital.png"
import CompanyLogo from "../../assets/company.png"
import PatientLogo from "../../assets/patient.png"
import AdminLogo from "../../assets/admin.png"
import { useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { getGraphData } from "../../api/servicesApi";
import { useSnackbar } from 'notistack'
import { getPatientDoses } from "../../api/servicesApi";
import moment from "moment";
import Table from "../../components/table/Table";
import { getPersonTraitements, getHospitalServices, getCompanyServices, getAllTraitementApi } from "../../api/servicesApi";

const Profile = ({role}) => {

  const token = useSelector(state => state?.data?.token);
  const userRDX = useSelector(state => state?.data?.user);
  const location = useLocation();
  const [graph, setGraph] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const locationData = location?.state?.data || {};
  const [mainPageData, setMainPageData] = useState([]);
  const [DataLoading, setDataLoading] = useState(true);
  // data
  const [doseData, setDoseData] = useState([]);
  // check if locationData is empty
  const isEmpty = Object.keys(locationData).length === 0 && locationData.constructor === Object;
  let user = {};
  if (!isEmpty) 
    user = locationData;
  else
  {
    if (userRDX.patient)
    {
      let temp = userRDX.patient;
      user = {...temp, role: "patient", OwnRole: "patient"};
    } else if (userRDX.person) {
      let temp = userRDX.person;
      user = {...temp, role: "person", OwnRole: "person"};
    } else if (userRDX.hospital) {
      let temp = userRDX.hospital;
      user = {...temp, role: "hospital", OwnRole: "hospital"};
    } else if (userRDX.company) {
      let temp = userRDX.company;
      user = {...temp, role: "company", OwnRole: "company"};
    } else if (userRDX.admin) {
      let temp = userRDX.admin;
      user = {...temp, role: "admin", OwnRole: "admin"};
    }
    else
    {
      user = {...userRDX}
      user.OwnRole = role;
    }
  }


  const formatData = (traitements) => {
    let data = [];
    let formatedData = {};
    let i = 0;
    let size = traitements?.length - 1;
    while (i <= size) {
      formatedData = {
        date: moment(traitements[size - i]?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        cin: traitements[size - i]?.patient?.cin || traitements[size - i]?.person?.cin,
        service: traitements[size - i]?.service?.name,
        examen: traitements[size - i]?.service?.examen,
        equipement: traitements[size - i]?.service?.equipment,
        hopital: traitements[size - i]?.service?.hospital?.designation,
        dose: traitements[size - i]?.dose,
      }
      data.push(formatedData);
      i++;
    }
    setDataLoading(false);
    setMainPageData(data);
  }

  const getGraph = async () => {
    try {
      const res = await getGraphData(token, {role: user.OwnRole, id: user._id});
      if (res.status === 200) {
        setGraph(res.data.data);
      } else {
        enqueueSnackbar(res?.data?.message || 'Something Went Wrong..', {variant: 'error'})
      }
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getDoses = async () => {
    try {
      let res;
      if (user.OwnRole === "patient")
        res = await getPatientDoses(token, user._id);
      else if (user.OwnRole === "person") {
        res = await getPersonTraitements(token, user?._id);
      } else if (user.OwnRole === "hospital") {
        res = await getHospitalServices(token, user?._id);
      } else if (user.OwnRole === "company") {
        res = await getCompanyServices(token, user?._id);
      } else 
        return ;
      
      if (res.status === 200) {
        if ((user.OwnRole === "patient" || user.OwnRole === "person") &&  res.data?.lastyearDose >= 18)
          enqueueSnackbar(user.cin + " Have exceeded The Does Rate Limit.", {variant: 'warning'})
        if (user.OwnRole === "patient")
          formatData(res?.data?.data);
        else if (user.OwnRole === "person")
          formatData(res?.data?.traitements);
        else if (user.OwnRole === "hospital")
          formatData(res?.data?.data?.data);
        else if (user.OwnRole === "company"){
          formatDataCompany(res?.data?.data);
        }
        else 
          setMainPageData([]);
        setDoseData(res.data);
      }
      setDataLoading(false);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
   }

   const formatDataCompany = (traitements) => {
    let data = [];
    let formatedData = {};
    let i = 0;
    let size = traitements?.length - 1;
    while (i <= size) {
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
  
  console.log(locationData);
  useEffect(() => {
    getDoses();
    getGraph();
  }, []);

  return (
    <div>
      <div className="single">
        <Sidebar role={user.role} />
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <div className="editButton">{user?.OwnRole === "person" ? "Professional Healthcare" : user?.OwnRole === "hospital" ? "Health Institution" : user?.OwnRole }</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={user?.OwnRole === "hospital" ? HospitalLogo :  
                      user?.OwnRole === "company" ? CompanyLogo :
                      user?.OwnRole === "patient" ? PatientLogo :
                      user?.OwnRole === "admin" ? AdminLogo :
                      OtherLogo}
                  alt=""
                  className="itemImg"
                />
                { (user.OwnRole === "patient" || user.OwnRole === "person") && 
                  <div className="details">
                    <h1 className="itemTitle">{user.firstName + ' ' + user.lastName}</h1>
                    {user.OwnRole === "person" && <div className="detailItem">
                      <span className="itemKey">Person Type:</span>
                      <span className="itemValue">{user.type}</span>
                    </div>}

                    {user.email && <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>}
                    <div className="detailItem">
                      <span className="itemKey">age:</span>
                      <span className="itemValue">{user.age}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">gender:</span>
                      <span className="itemValue">{user.gender}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">birthDate:</span>
                      <span className="itemValue">{moment(user.birthDate).format("YYYY-MM-DD")}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">address:</span>
                      <span className="itemValue">{user.address}</span>
                    </div>
                    {user.phone && <div className="detailItem">
                      <span className="itemKey">phone:</span>
                      <span className="itemValue">{user.phone}</span>
                    </div>}
                    <div className="detailItem">
                      <span className="itemKey">cin:</span>
                      <span className="itemValue">{user.cin}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">poids:</span>
                      <span className="itemValue">{user.poids}</span>
                    </div>
                    {user.OwnRole === "person" && <div className="detailItem">
                      <span className="itemKey">secteur:</span>
                      <span className="itemValue">{user.secteur}</span>
                    </div>}
                    {user.OwnRole === "person" && <div className="detailItem">
                      <span className="itemKey">fonction:</span>
                      <span className="itemValue">{user.fonction}</span>
                    </div>}
                    {user.OwnRole === "person" && 
                      <div className="detailItem">
                        <span className="itemKey">{user.company ? "Company" : user.hospital || user?.hospital?.type ? "Health Institution" : ""}:</span>
                        <span className="itemValue">
                          {
                            user.company ? 
                            ((typeof user.company === 'object' && user.company !== null) ? user.company?.designation : user.company)
                              : 
                              typeof user.hospital === 'object' && user.hospital !== null ? user.hospital?.designation : user.hospital
                          }
                          </span>
                      </div>
                    }
                  </div>
                }
                { (user.OwnRole === "hospital" || user.OwnRole === "company") && 
                  <div className="details">
                    <h1 className="itemTitle">{user.OwnRole === "hospital" ? "Health Institution" : "Company"}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Designation:</span>
                      <span className="itemValue">{user.designation}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Region:</span>
                      <span className="itemValue">{user.region}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Ville:</span>
                      <span className="itemValue">{user.ville}</span>
                    </div>
                    {user.phone && <div className="detailItem">
                      <span className="itemKey">phone:</span>
                      <span className="itemValue">{user.phone}</span>
                    </div>}
                    {user.address && <div className="detailItem">
                      <span className="itemKey">address:</span>
                      <span className="itemValue">{user.address}</span>
                    </div>}
                    {user.email && <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>}
                    {user.OwnRole === "hospital" &&  <div className="detailItem">
                      <span className="itemKey">statut:</span>
                      <span className="itemValue">{user.statut}</span>
                    </div>}
                  </div>
                }
                { (user.OwnRole === "admin") && 
                  <div className="details">
                    <h1 className="itemTitle">{user.firstName + " " + user.lastName}</h1>
                    <div className="detailItem">
                      <span className="itemKey">CIN:</span>
                      <span className="itemValue">{user.cin}</span>
                    </div>
                    {user.email && <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>}
                    {user.phone && <div className="detailItem">
                      <span className="itemKey">phone:</span>
                      <span className="itemValue">{user.phone}</span>
                    </div>}
                  </div>
                }
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Dose ( LastYear)" color={doseData?.lastyearDose >= 18 ? "#df4759" : "#00A7E1"} graph={graph} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile