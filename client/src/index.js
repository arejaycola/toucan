import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.scss';
// import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
