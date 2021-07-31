import React from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Loadable from 'react-loadable';

/**
 * List of routes for the page
 */
export const ROUTE = {
	public: [
		{
			exact: true,
			path: '/',
			meta: {},
			name: 'Home', // for breadcrumbs
			component: Loadable({
				loader: () => import('../containers/employee/index'),
				loading: 'loading',
			}),
		},
	],
};

/**
 * Function to set route info
 * @param {routeName} routeName
 */
export const setRoutes = (routeName) => {
	routeName = routeName || 'public';
	const route = ROUTE[routeName];
	return route.map((eachRoute, index) => {
		if (routeName === 'private') {
			return <PrivateRoute key={index} {...eachRoute} />;
		} else {
			return <PublicRoute key={index} {...eachRoute} />;
		}
	});
};
