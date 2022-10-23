import React, { useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { TextField, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import Autocomplete from '@mui/material/Autocomplete';
import { getPatientDoses, getPersonTraitements, getCompanyServices, getUltimateStatisticsApi, getHospitalServices, getAllTraitementApi } from '../../api/servicesApi';
import ReactToPrint from "react-to-print";
import { useRef } from 'react';
import { Button } from '@mui/material';
import XRAYLOGO from "../../assets/LOGO.png";

const Statistics = ({role}) => {

  // print functionallity
  const componentRef = useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <Button variant="contained" style={{
        width: "100%",
      }}>Print</Button>
    );
  }, []);

  //select patient/person
  const [selectedUSer, setSelectedUser] = React.useState({});
  const [totalDose, setTotalDose] = React.useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const [dataLoading, setDataLoading] = React.useState(true);
  const navigate = useNavigate();
  const labels = ["Date", "Region", "Ville", "Hospital", "Service", "Examen", "Protocole", "Appareil", "Dose"];
  const [services, setServices] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [regions, setRegions] = React.useState([]); // regions of hospitals
  const [servicesName, setServicesName] = React.useState([]); // services name
  const [hospitals, setHospitals] = React.useState([]); // hospitals
  const [appareils, setAppareils] = React.useState([]); // appareils
  const [patients, setPatients] = React.useState([]); // patients
  const [persons, setPersons] = React.useState([]); // persons
  const [stats, setStats] = React.useState({
    hospital: "",
    region: "",
    service: "",
    appareil: "",
    patient: role === "patient" ? user?.patient?._id : "",
    person: role === "person" ? user?.person?._id : "",
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
  });

  const getAllStatistics = async () => {
    try {
      setDataLoading(true);
      const res = await getUltimateStatisticsApi(token, stats);
      let finalData = [];
      if (res?.data?.data) {
        res.data?.data?.forEach((item) => {
          finalData.push({
            Date: moment(item.createdAt).format('YYYY-MM-DD'),
            Region: item.service?.hospital?.region,
            Ville: item.service?.hospital?.ville,
            Hospital: item.service?.hospital?.name,
            Service: item.service?.name,
            Examen: item.service?.examen,
            Protocole: item.service?.protocol,
            Appareil: item.service?.equipment,
            Dose: item?.dose,
          });
        });
        // calculate total dose
        let total = 0;
        res.data?.data?.forEach((item) => {
          total += item.dose;
        });
        setTotalDose(total);

        setData(finalData);
        if (stats.patient)
          setSelectedUser(res.data?.data[0]?.patient);
        if (stats.person)
          setSelectedUser(res.data?.data[0]?.person);
        
        setDataLoading(false);
      }
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }
  const getServices = async () => {
    try {
      let res;
      // console.log(user);
      switch (role) {
        case "admin":
          res = await getAllTraitementApi(token);
          break;
        case "hospital":
          res = await getHospitalServices(token, user?.hospital?._id);
          break;
        case "company":
          res = await getCompanyServices(token);
          break;
        case "person":
          res = await getPersonTraitements(token, user?.person?._id);
          break;
        case "patient":
          res = await getPatientDoses(token, user?.patient?._id);
          break;
        default:
          break;
      }
      // console.log(res.data);
      let regionsOpt = [];
      let servicesOpt = [];
      let hospitalsOpt = [];
      let appareilsOpt = [];
      let patientsOpt = [];
      let personsOpt = [];
      let responseData;
      if (role === "person") {
        responseData = res?.data?.traitements;
      } else if (role === "hospital") {
        responseData = res.data?.data?.data;
      }
      else {
        responseData = res?.data?.data;
      } 
      responseData?.map(doc => {
        if (!regionsOpt.find(region => region?.label === doc?.service?.hospital?.region) && doc?.service && doc?.service?.hospital) {
          regionsOpt?.push({
            label: doc.service?.hospital?.region,
            data: doc.service?.hospital?.region,
          });
        }
        // check if the service is already in the array
        if (!servicesOpt.find(service => service?.label === doc?.service?.name) && doc?.service !== null) {
          servicesOpt.push({
            label: doc?.service?.name,
            data: doc?.service?._id,
          });
        }
        // check if the hospital is already in the array
        if (!hospitalsOpt?.find(hospital => hospital?.label === doc?.service?.hospital?.name) && doc?.service && doc.service?.hospital) {
          hospitalsOpt?.push({
            label: doc.service?.hospital?.name,
            data: doc.service?.hospital?._id,
          });
        }
        // check if the appareil is already in the array
        if (!appareilsOpt.find(appareil => appareil?.label === doc?.service?.equipment) && doc?.service?.equipment) {
          appareilsOpt.push({
            label: doc?.service?.equipment,
            data: doc?.service?.equipment,
          });
        }
        // check if the patient is already in the array
        // if (doc.patient !== undefined)
        if (doc.patient !== undefined && !patientsOpt.find(patient => patient?.data === doc?.patient?._id) && doc?.patient) {
          patientsOpt?.push({
            label: doc?.patient?.firstName + " " + doc?.patient?.lastName + " [ " + doc?.patient?.cin + " ]",
            data: doc?.patient?._id,
          });
        }
        // check if the person is already in the array
        if (doc.person !== undefined && !personsOpt.find(person => person?.data === doc?.person?._id) && doc?.person) {
          personsOpt?.push({
            label: doc?.person?.firstName + " " + doc?.person?.lastName + " [ " + doc?.person?.cin + " ]",
            data: doc?.person?._id,
          });
        }
      });
      setRegions(regionsOpt);
      setServicesName(servicesOpt);
      setHospitals(hospitalsOpt);
      setAppareils(appareilsOpt);
      setPatients(patientsOpt);
      setPersons(personsOpt);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  useEffect(() => {
    getServices();
    getAllStatistics();
  }, [stats]);

	return (
    <div className="home">
      <Sidebar role={role} />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listTitleContainer">
            <div style={{
              display: "flex",
              width: "100%",
              marginBottom: "20px",
            }}>
              { (role === "hospital" || role === "admin") &&
                  <>
                    <Autocomplete
                      sx={{ width: "100%", mr: 2 }}
                      disablePortal
                      id="combo-box-demo"
                      options={patients}
                      onChange={(event, value) => {
                        setStats({
                          ...stats,
                          patient: value?.data,
                          person: "",
                        });
                      }}
                      renderInput={(params) => <TextField {...params} label="Patients" />}
                    />
                    <Autocomplete
                      sx={{ width: "100%", mr: 2 }}
                      disablePortal
                      id="combo-box-demo"
                      options={persons}
                      onChange={(event, value) => {
                        setStats({
                          ...stats,
                          person: value?.data,
                          patient: "",
                        });
                      }}
                      renderInput={(params) => <TextField {...params} label="Persons" />}
                    />
                  </> }
            </div>
            <div style={{
              display: "flex",
              width: "100%",
            }}>

            {(role !== "hospital" && role !== "company") &&
              <Autocomplete
                sx={{ width: "20%", mr: 2 }}
                disablePortal
                id="combo-box-demo"
                options={hospitals}
                onChange={(e, value) => {
                  setStats({
                    ...stats,
                    hospital: value?.data,
                  });
                }}
                renderInput={(params) => <TextField {...params} label="Hospital" />}
              />}
              <Autocomplete
                sx={{ width: "20%", mr: 2 }}
                disablePortal
                id="combo-box-demo"
                options={regions}
                onChange={(e, value) => {
                  setStats({
                    ...stats,
                    region: value?.data,
                  });
                }}
                renderInput={(params) => <TextField {...params} label="Region" />}
              />
              <Autocomplete
                sx={{ width: "20%", mr: 2 }}
                disablePortal
                id="combo-box-demo"
                options={servicesName}
                onChange={(e, value) => {
                  setStats({
                    ...stats,
                    service: value?.data,
                  });
                }}
                renderInput={(params) => <TextField {...params} label="Service" />}
              />
              <Autocomplete
                sx={{ width: "20%", mr: 2 }}
                disablePortal
                id="combo-box-demo"
                options={appareils}
                onChange={(e, value) => {
                  setStats({
                    ...stats,
                    appareil: value?.data,
                  });
                }}
                renderInput={(params) => <TextField {...params} label="Appariel" />}
              />
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="From"
                  inputFormat="YYYY/MM/DD"
                  value={stats?.startDate}
                  onChange={(newValue) => { setStats({ ...stats, startDate: newValue?.format("YYYY/MM/DD") });}}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="To"
                  inputFormat="YYYY/MM/DD"
                  value={stats?.endDate}
                  onChange={(newValue) => { setStats({ ...stats, endDate: newValue.format("YYYY/MM/DD") });}}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
                />
              </LocalizationProvider>
            </FormControl>
            </div>
          </div>
          <ReactToPrint 
            content={reactToPrintContent}
            trigger={reactToPrintTrigger} 
          />
          <br />
          <hr />
          <div ref={componentRef}>
            <div style={{
              display: "flex",
              justifyContent: "space-around",
            }}>
              <p>DATE: {moment().format("YYYY-MM-DD")}</p>
              <h1 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>Rapport dosimétrique</h1>
              <img src={XRAYLOGO} width="200px" />
            </div>
            <div style={{ marginLeft: "100px", marginTop: "-50px"}}>
              <h3>Période : {stats?.startDate} - {stats?.endDate}</h3>
              <h3>Année : {moment(stats?.endDate).year()}</h3>
            </div>

            {(stats?.patient || stats?.person) &&  
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <div style={{ display: "flex" }}>
                  <h3>Nom : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.lastName}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>CIN :</h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.cin}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Date de naissance : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {moment(selectedUSer?.birthDate).format("YYYY-MM-DD")}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Adresse : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.address}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Tél : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.phone}</p>
                </div>
                { stats.person &&
                  <div style={{ display: "flex", marginTop: "-30px" }}>
                    <h3>Lieu d’activité : </h3>
                    <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.secteur}</p>
                  </div>}
              </div>
              <div>
                <div style={{ display: "flex" }}>
                  <h3>Prénom : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.firstName}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Sexe : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.gender}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Age : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.age}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>ID : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?._id}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>Email : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.email}</p>
                </div>
                { stats?.person &&
                  <div style={{ display: "flex", marginTop: "-30px" }}>
                  <h3>La fonction  : </h3>
                  <p style={{ fontSize: "20px", marginTop: "16px" }}>&nbsp;&nbsp; {selectedUSer?.fonction}</p>
                </div>}
              </div>
            </div>}

            {(stats?.patient || stats?.person) &&  
              <div style={{
              display: "flex",
              justifyContent: "space-around",
            }}>
              <h3>Dose Total : {totalDose} mSv</h3> 
            </div>}
            <Table data={data} labels={labels} DataLoading={dataLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;