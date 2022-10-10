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