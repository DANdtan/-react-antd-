import React from 'react';
import ReactDOM from 'react-dom';

import routers from "./router/router"
import {
  BrowserRouter as Router 
} from 'react-router-dom'
import store from "./redux/store/store"
import { Provider } from 'react-redux'
//import { ConnectedRouter } from 'react-router-redux'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {routers}
    </Router >
  </Provider>
  ,
  document.getElementById('root'));

