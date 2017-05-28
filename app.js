import ReactDOM from 'react-dom'
import React from 'react'
import {Button} from 'ctrl/Button'
import PanelComponentLoader from './src/lib/PanelComponentLoader'


require('./styles/App.sass')
require('./src/lib/react-helper.js');
//import {AppContainer} from 'react-hot-loader';

import jQuery from 'jquery'


if (!global.$)
    global.$ = jQuery;


global.ReactDOM = ReactDOM;
global.React = React;




ReactHelper.register('PanelComponentLoader', PanelComponentLoader);


ReactHelper.initComponents();


if (module.hot) {
    module.hot.accept();
}