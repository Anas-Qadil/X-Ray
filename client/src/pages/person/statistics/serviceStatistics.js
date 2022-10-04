import React from 'react'
import Datatable from '../../../components/person/datatable/Datatable'
import Navbar from '../../../components/person/navbar/Navbar'
import Sidebar from '../../../components/person/sidebar/Sidebar'
import "./list.scss"

const PersonServiceStatistics = () => {
	return (
		<div className="list">
		<Sidebar role='person'/>
		<div className="listContainer">
			<Navbar/>
			<Datatable title={'Services statistics'} />
		</div>
		</div>
  )
}

export default PersonServiceStatistics