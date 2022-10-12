// /sign-up/person
import axios from 'axios';
import { links } from '../../config';

export const signUpPerson = async (token, data) => {
	return await axios.post(`${links.localhost}/api/sign-up/person`, data, {
	  headers: {
		Accept: "application/json",
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	  },
	})
}
export const signUpPatient = async (token, data) => {
	return await axios.post(`${links.localhost}/api/sign-up/patient`, data, {
	  headers: {
		Accept: "application/json",
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	  },
	})
}
export const signUpCompany = async (token, data) => {
	return await axios.post(`${links.localhost}/api/sign-up/company`, data, {
	  headers: {
		Accept: "application/json",
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	  },
	})
}
export const signUpHospital = async (token, data) => {
	return await axios.post(`${links.localhost}/api/sign-up/hospital`, data, {
	  headers: {
		Accept: "application/json",
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	  },
	})
}