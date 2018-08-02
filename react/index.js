import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


import App from './containers/App';
import configStore from './store/configStore';
import './index.scss';
import 'font-awesome/css/font-awesome.css';


const store = configStore();

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('wrapper')
);