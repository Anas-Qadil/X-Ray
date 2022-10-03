import axios from 'axios';
import { links } from '../../config';

export const loginApi = async (username, password) => {
	return axios.post(`${links.localhost}/api/login`, { username, password }, {
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
    }
  });
}
