import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';

import PnlSummaryPage from './containers/pnl_summary_page';
import LoginPage from './containers/login_page';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

const App = () => {
  return <div>First page!</div>;
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/pnlsummary" component={PnlSummaryPage}/>
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);
