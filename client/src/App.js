import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Hospitals from "./pages/admin/hospitals";
import Companies from "./pages/admin/companies";
import AddTraitement from './pages/actions/addTraitement';
import CreateAccount from './pages/actions/createAccount';
import Loader from "./components/loader";
import { reloginApi } from './api/authApi/loginApi';
import { useDispatch } from "react-redux";
import { setData } from './store/index';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  // grep user form redux
  const ReduxToken = useSelector(state => state?.data?.token);
  const ReduxUser = useSelector(state => state?.data?.data?.user);
  const role = ReduxUser?.role;

  const navigate = useNavigate();

  const relogin = async (token) => {
    try {
      const res = await reloginApi(token);
      // console.log(res);
      const data = res.data;
      const payload = {
        user: data.user,
        data: data,
        token: data.token,
      }
      // fill redux store with user data
      dispatch(setData(payload));
      // put token to local storage
      localStorage.setItem('token', data?.token);
      // put role to local storage
      localStorage.setItem('role', data?.user?.role);
      // redirect to patient dashboard
      navigate(`/${data?.user?.role}`);
    } catch (error) {
      // alert(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const LocalRole = localStorage.getItem('role');
    if (token && LocalRole)
    {
      relogin(token);
      setLoading(false);
    } else {
      navigate('/');
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />


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
        {/* Actions */}
        <Route path="/add-traitement" element={<AddTraitement role={role} />} />
        <Route path="/create-account" element={<CreateAccount role={role} />} />

        <Route path="*" element={<NotFound/ >} />
      </Routes>
    </div>
  );
}

export default App;
