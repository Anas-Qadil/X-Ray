import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/login/login';
import Patient from './pages/patient/patient';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
    </div>
  );
}

export default App;
