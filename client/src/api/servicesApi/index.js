import axios from 'axios';
import { links } from '../../config';

// /patient/:id/doses
export const getPatientDoses = async (token, id) => {
	return await axios.get(`${links.localhost}/api/patient/${id}/doses`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getPersonTraitements = async (token, id) => {
  return await axios.get(`${links.localhost}/api/person/${id}/traitements`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getCompanyServices = async (token) => {
  return await axios.get(`${links.localhost}/api/company/services`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getHospitalServices = async (token, id) => {
  return await axios.get(`${links.localhost}/api/hospital/${id}/traitements`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getCompanies = async (token) => {
  return await axios.get(`${links.localhost}/api/admin/companies`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getHospitals = async (token) => {
  return await axios.get(`${links.localhost}/api/admin/hospitals`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getPatients = async (token, search) => {
  return await axios.get(`${links.localhost}/api/admin/patients`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const getAllServices = async (token) => {
  return await axios.get(`${links.localhost}/api/admin/services`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getPersons = async (token, search) => {
  return await axios.get(`${links.localhost}/api/admin/persons`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const addPersonTraitement = async (token, data) => {
  return await axios.post(`${links.localhost}/api/person/${data.person}/add-traitement`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
export const addPatientTraitement = async (token, data) => {
  return await axios.post(`${links.localhost}/api/hospital/add-traitement`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllCompanies = async (token, search) => {
  return await axios.get(`${links.localhost}/api/admin/companies`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}
export const getAllHospitals = async (token, search) => {
  return await axios.get(`${links.localhost}/api/admin/hospitals`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const getAllServicesApi = async (token, search, hospitalSearch) => {
  return await axios.get(`${links.localhost}/api/admin/search-services`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
      hospitalSearch
    },
  })
}
export const getAllHospitalServices = async (token) => {
  return await axios.get(`${links.localhost}/api/hospital/service/services`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getPatientForHospitlRole = async (token, search) => {
  return await axios.get(`${links.localhost}/api/hospital/patients`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const getPersonForCompanyRole = async (token, search) => {
  return await axios.get(`${links.localhost}/api/company/persons`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const deleteCompanyAPI = async (token, id) => {
  return await axios.delete(`${links.localhost}/api/admin/company/${id}`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteHospitalAPI = async (token, id) => {
  return await axios.delete(`${links.localhost}/api/admin/hospital/${id}`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deletePatientAPI = async (token, id) => {
  return await axios.delete(`${links.localhost}/api/admin/patient/${id}`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deletePersonAPI = async (token, id) => {
  return await axios.delete(`${links.localhost}/api/admin/person/${id}`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteServiceAPI = async (token, id) => {
  return await axios.delete(`${links.localhost}/api/admin/service/${id}`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllTraitementApi = async (token) => {
  return await axios.get(`${links.localhost}/api/admin/all-traitements`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getUltimateStatisticsApi = async (token, stats) => {
  return await axios.get(`${links.localhost}/api/admin/ultimate-statistics`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      stats,
    },
  })
}
export const AddServiceAPI = async (token, data) => {
  return await axios.post(`${links.localhost}/api/hospital/add-service`, {data}, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getHospitalPersons = async (token, search) => {
  return await axios.get(`${links.localhost}/api/hospital/persons`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  })
}

export const getGraphData = async (token) => {
  return await axios.get(`${links.localhost}/api/graph`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
