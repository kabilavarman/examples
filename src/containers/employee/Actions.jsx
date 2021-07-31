/**
 * Add or Update user - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function login(data) {
	return {
		types: [`LOGIN_PENDING`, `LOGIN_FULFILLED`, `LOGIN_REJECTED`],
		method: 'POST',
		url: 'v1/store/login',
		data,
	};
}

/**
 * Forgot password async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function getEmployees() {
	return {
		types: [
			`GET_ALL_EMPLOYEE_PENDING`,
			`GET_ALL_EMPLOYEE_FULFILLED`,
			`GET_ALL_EMPLOYEE_REJECTED`,
		],
		method: 'GET',
		url: `api/employee`,
	};
}
