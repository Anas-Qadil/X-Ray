import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

const Patient = () => {

  const [loading, setLoading] = useState(true);
  
  // check if user is logged in
  const token = useSelector(state => state.data.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    setLoading(false);
  }, [token, navigate])

  if (loading) return <Loader />
  return (
    <div>Patient</div>
  );
}

export default Patient;