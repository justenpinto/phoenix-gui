import axios from 'axios';

const ROOT_URL = 'http://localhost:5000'

export const AUTHENTICATE_USER = 'auth_user';

export function authenticateUser(values, successCallback, errorCallback) {
  const request = axios.post(`${ROOT_URL}/login`, values).
    then(() => successCallback()).
    catch(() => errorCallback());

  return {
    type: AUTHENTICATE_USER,
    payload: request
  }
}
