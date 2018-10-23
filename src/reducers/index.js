import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './reducer_user';
import PnlSummaryReducer from './reducer_pnl_summary';

const rootReducer = combineReducers({
  user: UserReducer,
  pnl_summary: PnlSummaryReducer,
  form: formReducer
});

export default rootReducer;
