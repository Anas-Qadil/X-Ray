import React from 'react'
import Datatable from '../../../components/datatable/Datatable'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import "./list.scss"

const PatientServiceStatistics = () => {
	return (
		<div className="list">
		<Sidebar role='patient'/>
		<div className="listContainer">
			<Navbar/>
			<Datatable title={'Services statistics'} />
		</div>
		</div>
  )
}

export default PatientServiceStatistics