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
import { getPatientDoses, getPersonTraitements, getCompanyServices, getHospitalServices, getAllTraitementApi } from '../../api/servicesApi';


const Statistics = ({role}) => {

  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const navigate = useNavigate();
  const labels = ["Date", "Region", "Ville", "Hospital", "Service", "Examen", "Protocole", "Appareil", "Equipement", "Dose"];
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
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });

  const getAllStatistics = async () => {
    try {
      console.log(stats);
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message || 'Something Went Wrong..', {variant: 'error'})
    }
  }

  const getServices = async () => {
    try {
      let res;
      console.log(user);
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
      console.log(res.data);
      let regionsOpt = [];
      let servicesOpt = [];
      let hospitalsOpt = [];
      let appareilsOpt = [];
      let patientsOpt = [];
      let personsOpt = [];
      let responseData;
      if (role === "person") {
        responseData = res.data.traitements;
      } else if (role === "hospital") {
        responseData = res.data.data.data;
      }
      else {
        responseData = res?.data?.data;
      } 
      responseData?.map(doc => {
        if (!regionsOpt.find(region => region.label === doc.service?.hospital?.region)) {
          regionsOpt.push({
            label: doc.service?.hospital?.region,
            data: doc.service?.hospital?.region,
          });
        }
        // check if the service is already in the array
        if (!servicesOpt.find(service => service.label === doc.service?.name)) {
          servicesOpt.push({
            label: doc.service?.name,
            data: doc.service?._id,
          });
        }
        // check if the hospital is already in the array
        if (!hospitalsOpt.find(hospital => hospital.label === doc.service?.hospital?.name)) {
          hospitalsOpt.push({
            label: doc.service?.hospital?.name,
            data: doc.service?.hospital?._id,
          });
        }
        // check if the appareil is already in the array
        if (!appareilsOpt.find(appareil => appareil.label === doc?.service?.equipment)) {
          appareilsOpt.push({
            label: doc.service?.equipment,
            data: doc.service?.equipment,
          });
        }
        // check if the patient is already in the array
        // if (doc.patient !== undefined)
        if (doc.patient !== undefined && !patientsOpt.find(patient => patient.data === doc?.patient?._id)) {
          patientsOpt.push({
            label: doc?.patient?.firstName + " " + doc?.patient?.lastName + " [ " + doc?.patient?.cin + " ]",
            data: doc?.patient?._id,
          });
        }
        // check if the person is already in the array
        if (doc.person !== undefined && !personsOpt.find(person => person.data === doc?.person?._id)) {
          personsOpt.push({
            label: doc?.person?.firstName + " " + doc?.person?.lastName + " [ " + doc?.person?.cin + " ]",
            data: doc?.person?._id,
          });
        }
      });
      console.log(personsOpt);
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
    getAllStatistics();
    getServices();
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
                      renderInput={(params) => <TextField {...params} label="Patients" />}
                    />
                    <Autocomplete
                      sx={{ width: "100%", mr: 2 }}
                      disablePortal
                      id="combo-box-demo"
                      options={persons}
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
                  value={stats.startDate}
                  onChange={(newValue) => { setStats({ ...stats, startDate: newValue.format("YYYY/MM/DD") });}}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="To"
                  inputFormat="YYYY/MM/DD"
                  value={stats.endDate}
                  onChange={(newValue) => { setStats({ ...stats, endDate: newValue.format("YYYY/MM/DD") });}}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
                />
              </LocalizationProvider>
            </FormControl>
            </div>
          </div>
          <br />
          <hr />
          <Table data={[]} labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;