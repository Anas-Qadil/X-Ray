import axios from 'axios';
import { links } from '../../config';

// /patient/:id/doses
export const getPatientDoses = async (token, id) => {
  console.log(links.localhost);
	return await axios.get(`${links.localhost}/api/patient/${id}/doses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}