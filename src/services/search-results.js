import axios from 'axios';

export function get () {
  return axios.get('http://localhost:3001/results');
}
