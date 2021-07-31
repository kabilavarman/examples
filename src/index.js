import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { setRoutes } from '../src/rotues/config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import callAPIMiddleware from './middleware/callAPIMiddleware';
import reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';

const middleware = [thunkMiddleware, callAPIMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

ReactDOM.render(
	<Provider
		store={createStore(
			reducer,
			composeEnhancers(applyMiddleware(...middleware)),
		)}
	>
		<BrowserRouter basename={window.env.REACT_APP_HOMEPAGE}>
			<Switch>
				{setRoutes()}
				{/* {setRoutes('public')} */}
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
