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