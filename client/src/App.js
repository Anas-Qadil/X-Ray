import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/login/login';
import Patient from './pages/patient/patient';
import Admin from './pages/admin/admin';
import Company from './pages/company/company';
import Hospital from './pages/hospital/hospital';
import Person from './pages/person/person';
import NotFound from "./pages/notFound"
import Statistics from './pages/statistics/statistics';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/company" element={<Company />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/person" element={<Person />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound/ >} />
      </Routes>
    </div>
  );
}

export default App;
