
import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'popper.js';
import 'bootstrap';

import { Provider } from 'react-redux';
import SalarySwitcher from './features/salary/SalarySwitcher';
import './assets/app.scss';

import createAppStore from 'app/redux/index';

export const browserRender = () => {
    const store = createAppStore();
    ReactDOM.render(
        <Provider key="provider" store={store} >
            <SalarySwitcher />
        </Provider>,
        document.getElementById('app'),
    );
};
