import { AUTHENTICATE_USER } from '../actions/index';

export default function (state = {authenticated: undefined}, action) {
  switch(action.type) {
    case AUTHENTICATE_USER:
      console.log('Authentication payload: ', action);
      // console.log(action.payload);
      if (action.payload.status == 200) {
        return  {
          email: action.payload.data.user,
          access_token: action.payload.data.accessToken,
          refresh_token: action.payload.data.refreshToken,
          authenticated: true
        }
      } else {
        return {
          error_message: action.payload.response.data.message,
          authenticated: false
        };
      }
    default:
      return state;
  }
}
