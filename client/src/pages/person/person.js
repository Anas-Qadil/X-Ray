import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import "./home.scss";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Person = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // get user data from redux store
  const token = useSelector(state => state?.data?.token);
  const user = useSelector(state => state?.data?.data?.user);
  // console.log(user);
  // get patient doses

  // check if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    if (user?.role !== 'person') {
      navigate("/");
    }
    setLoading(false);
  }, [])

  if (loading) return <Loader />
  return (
    <div className="home">
      <Sidebar role="person" />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
}

export default Person;