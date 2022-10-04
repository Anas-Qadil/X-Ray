import React from 'react'
import Datatable from '../../../components/person/datatable/Datatable'
import Navbar from '../../../components/person/navbar/Navbar'
import Sidebar from '../../../components/person/sidebar/Sidebar'
import "./list.scss"


const PersonHospitalStatistics = () => {
	return (
    <div className="list">
      <Sidebar role='person'/>
      <div className="listContainer">
        <Navbar/>
        <Datatable title={'Hospitals statistics'} />
      </div>
    </div>
  )
}

export default PersonHospitalStatistics