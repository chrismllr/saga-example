// @flow
import axios from 'axios';

export function get(): Promise<*> {
  return axios.get('http://localhost:3001/results');
}
