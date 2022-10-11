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