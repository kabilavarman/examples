import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorization from '../utility/authorization';
import { setTitle, setMetaDescription } from './config';
import Application from '../containers/Application';

/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const PublicRoute = ({ component: Component, meta, ...rest }) => {
	console.log('alsdflasjdflkjaslkdfj aslkdfj laksjdf lksadj', Component);
	return (
		<Route
			{...rest}
			render={(props) => {
				return (
					<Application
						{...props}
						isLoggedIn={Authorization.isLoggedIn}
						auth={Authorization}
						component={Component}
					/>
				);
			}}
		/>
	);
};

export default PublicRoute;
