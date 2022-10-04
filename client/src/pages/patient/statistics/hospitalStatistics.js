import React from 'react'
import Datatable from '../../../components/patient/datatable/Datatable'
import Navbar from '../../../components/patient/navbar/Navbar'
import Sidebar from '../../../components/patient/sidebar/Sidebar'
import "./list.scss"
import ShospitalTable from '../../../components/patient/statistics/Table'


const PatientHospitalStatistics = () => {
	return (
    <div className="home">
      <Sidebar role='patient'/>
      <div className="homeContainer">
        <Navbar/>
        <div className="listContainer">
          <div className="listTitle">Patient Hospital Statistics</div>
            <ShospitalTable title={'Hospitals statistics'} />
        </div>
      </div>
    </div>
  )
}

export default PatientHospitalStatistics;