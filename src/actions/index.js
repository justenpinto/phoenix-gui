import axios from 'axios';

const ROOT_URL = 'http://localhost:5000'

export const AUTHENTICATE_USER = 'auth_user';
export const FAILED_USER = 'failed_user';
export const LOGOUT_USER_ERROR = 'logout_user_error';
export const LOGOUT_USER = 'logout_user';
export const PNL_SUMMARY_ERROR = 'pnl_summary_error';
export const PNL_SUMMARY = 'pnl_summary';

export function authenticateUser(values, successCallback, errorCallback) {
  const request = axios.post(`${ROOT_URL}/login`, values);
  return (dispatch) => {
    request.then(
      ({data}) => {
        dispatch({type: AUTHENTICATE_USER, payload: data})
      },
      (error) => {
        dispatch({type: FAILED_USER, payload: error})
      }
    );
  };
}

export function logoutUser(accessToken) {
  var headers = {
    'Authorization': 'Bearer ' + accessToken
  }
  const request = axios.post(`${ROOT_URL}/logout/access`, null, {headers});
  return dispatch => {
    request.then(
      ({data}) => {
        dispatch( { type: LOGOUT_USER, payload: data})
      },
      error => {
        dispatch( { type: LOGOUT_USER_ERROR, payload: error})
      }
    );
  }
}

export function fetchPnlSummary(accessToken) {
  var headers = {
    'Authorization': 'Bearer ' + accessToken
  }
  const request = axios.post(`${ROOT_URL}/pnlsummary`, null, {headers});

  return dispatch => {
    request.then(
      ({data}) => {
        dispatch( { type: PNL_SUMMARY, payload: data})
      },
      error => {
        dispatch( { type: PNL_SUMMARY_ERROR, payload: error})
      }
    );
  };
}
