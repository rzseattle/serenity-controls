import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';


hydrate(<App />, document.getElementById('app'));

// @ts-ignore
if (module.hot) {
    // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
    // while `hot` would configure HMR for the CURRENT module
    // @ts-ignore
    module.hot.accept()
}