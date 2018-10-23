import {
  AUTHENTICATE_USER,
  FAILED_USER,
  LOGOUT_USER,
  LOGOUT_USER_ERROR
} from '../actions/index';

export default function (state = {authenticated: undefined}, action) {
  switch(action.type) {
    case AUTHENTICATE_USER:
      const { user, accessToken, refreshToken } = action.payload;
      return  {
        email: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: true
      };
    case FAILED_USER:
      return {
        error_message: action.payload.response.data.message,
        authenticated: false
      };
    case LOGOUT_USER:
      return {
        authenticated: undefined
      }
    case LOGOUT_USER_ERROR:
      return {
        email: state.email,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        authenticated: undefined
      }
    default:
      return state;
  }
}
