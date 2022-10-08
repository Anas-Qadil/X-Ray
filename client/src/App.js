import React, {useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/login/login';
import Patient from './pages/patient/patient';
import Admin from './pages/admin/admin';
import Company from './pages/company/company';
import Hospital from './pages/hospital/hospital';
import Person from './pages/person/person';
import NotFound from "./pages/notFound"
import Statistics from './pages/statistics/statistics';
import HospitalPatient from './pages/hospital/hospitalPatient';
import HospitalService from './pages/hospital/hospitalService';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import Hospitals from "./pages/admin/hospitals";
import Companies from "./pages/admin/companies";

function App() {

  // grep user form redux
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !role || !user) {
      navigate('/');
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Dashboard */}
        <Route path="/patient" element={<Patient />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/company" element={<Company />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/person" element={<Person />} />
        {/* statistics */}
        <Route path="/statistics" element={<Statistics role={role} />} />
        {/* Users management */}
        <Route path="/hospital/patients" element={<HospitalPatient role={role} />} />
        <Route path="/hospital/services" element={<HospitalService role={role} />} />
        <Route path="/persons" element={<HospitalPatient role={role} />} />
        {/* Admin Part */}
        <Route path="/admin/hospitals" element={<Hospitals role={role} />} />
        <Route path="/admin/companies" element={<Companies role={role} />} />

        <Route path="*" element={<NotFound/ >} />
      </Routes>
    </div>
  );
}

export default App;
