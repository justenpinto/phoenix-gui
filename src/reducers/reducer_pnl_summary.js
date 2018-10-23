import {
  PNL_SUMMARY,
  PNL_SUMMARY_ERROR
} from '../actions/index';

export default function (state = [], action) {
  switch(action.type) {
    case PNL_SUMMARY:
      console.log('Pnlsummary: ', action.payload);
      return action.payload
    case PNL_SUMMARY_ERROR:
      console.log('Pnlsummaryerror: ', action.payload);
      return state;
    default:
      return state;
  }
}
