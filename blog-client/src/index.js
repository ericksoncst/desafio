import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css'

import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const App = (
	<Routes />
);

ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();
