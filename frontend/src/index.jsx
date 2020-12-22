import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';
import axios from "axios";

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Axios default config
const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken;
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken;
}

ReactDOM.render(
  <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);
