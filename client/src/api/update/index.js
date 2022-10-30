import axios from 'axios';
import { links } from '../../config';


export const updateHospitalData = async (token, data) => {
	return await axios.put(`${links.localhost}/api/update/hospital`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateCompanyData = async (token, data) => {
	return await axios.put(`${links.localhost}/api/update/company`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updatePatientData = async (token, data) => {
	return await axios.put(`${links.localhost}/api/update/patient`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updatePersonData = async (token, data) => {
	return await axios.put(`${links.localhost}/api/update/person`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAdmin = async (token) => {
  return await axios.get(`${links.localhost}/api/admin/admin-data`, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateAdminData = async (token, data) => {
  return await axios.put(`${links.localhost}/api/update/admin`, data, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}