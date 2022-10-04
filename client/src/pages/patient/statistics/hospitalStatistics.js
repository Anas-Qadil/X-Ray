import React from 'react'
import Datatable from '../../../components/patient/datatable/Datatable'
import Navbar from '../../../components/patient/navbar/Navbar'
import Sidebar from '../../../components/patient/sidebar/Sidebar'
import "./list.scss"


const PatientHospitalStatistics = () => {
	return (
    <div className="list">
      <Sidebar role='patient'/>
      <div className="listContainer">
        <Navbar/>
        <Datatable title={'Hospitals statistics'} />
      </div>
    </div>
  )
}

export default PatientHospitalStatistics;