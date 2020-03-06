import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import App from "./App";
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './assets/js/modules';
import {Provider} from 'react-redux';

import './assets/styles/index.scss'
import 'draft-js/dist/Draft.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'babel-polyfill';

const store = createStore(rootReducer, composeWithDevTools());

axios.defaults.baseURL = 'http://localhost:3030/api'

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();




