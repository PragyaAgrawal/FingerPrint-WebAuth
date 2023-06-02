import React from 'react';
import ReactDOM from 'react-dom';
import App from './public/app';
import * as serviceWorker from './serviceWorkerRegistration';


ReactDOM.render(<App />, document.querySelector('#root'));

serviceWorker.register();