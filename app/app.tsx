
import React from 'react';
import { hydrate } from 'react-dom';

import './main.scss';


export const browserRender = () => {

    hydrate(
        <div>Info</div>,
        document.getElementById('app'),
    );
};
