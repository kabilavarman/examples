import { isObject, isString, isEmpty } from 'lodash';
import { ls } from './localStorage';

class Authorization {
	constructor() {
		this.authUser = null;
		this.authUserId = null;
		this.authRole = null;
		this.sessionTimer = null;
		this.sessionExpireTime = 1000 * 60 * 10; // (1000 * 60) = 1 minute & multiply 3 equal t0 3 minutes (time is in milliseconds (1000 is 1 second))
		// this.idleTimer();
	}
	/**
	 * set auth user details to class property
	 *
	 * @return void
	 */
	setAuthUser() {
		this.authUser = JSON.parse(ls.getItem('authorizedUserDetails'));
	}
	/**
	 * check is active user is logged in
	 *
	 * @return boolean
	 */
	isLoggedIn() {
		return typeof ls.getItem('authorizedUserDetails') === 'string';
	}
	/**
	 * check user is having the expected role
	 *
	 * @param role
	 * @return boolean
	 */
	isUserRole(role) {
		const user = this.getAuthUser();

		return (
			isObject(user) && isObject(user.userRole) && user.userRole.name === role
		);
	}
	/**
	 * get logged in user details
	 *
	 * @return boolean
	 */
	getAuthUser() {
		if (this.isLoggedIn()) {
			this.setAuthUser();
		}

		return this.authUser;
	}
	/**
	 * get auth user identifier
	 *
	 * @return int
	 */
	getAuthUserId() {
		const user = this.getAuthUser();
		return isObject(user) && user.userId ? user.userId : 0;
	}
	/**
	 * get auth user role Id
	 * @return int
	 */
	getAuthRoleId() {
		const user = this.getAuthUser();
		return isObject(user) && user.roleId ? user.roleId : 0;
	}

	/**
	 * Get authentication access token
	 *
	 * @return string
	 */
	getAccessToken() {
		let accessToken = null;
		const authUser = this.getAuthUser();
		if (authUser && isString(authUser.token)) {
			accessToken = authUser.token;
		}

		return accessToken;
	}

	/**
	 * login the user by setting it in local storage
	 *
	 * @return boolean
	 */
	login(userDetails) {
		if (typeof Storage !== 'undefined') {
			ls.removeItem('authorizedUserDetails');
			ls.setItem('authorizedUserDetails', JSON.stringify(userDetails));
		} else {
			console.error('local storage is not supported');
		}
	}

	/**
	 * Once user is logged in, redirect the user given redirectPath
	 *
	 * @param {*} props
	 */
	redirectAfterLogin(redirectPath = 'home') {
		ls.setItem('userLandingPath', redirectPath);
		document.location = redirectPath;
	}

	/**
	 * get logged in user details
	 *
	 * @return boolean
	 */
	logout() {
		if (typeof Storage !== 'undefined') {
			ls.removeItem('authorizedUserDetails');
			ls.removeItem('userLandingPath');
			window.location.reload();
		} else {
			console.error('local storage is not supported');
		}
	}

	/**
	 * return the landing page path of user
	 */
	getUserLandingPath() {
		return !isEmpty(ls.getItem('userLandingPath'))
			? ls.getItem('userLandingPath')
			: '';
	}

	/**
	 * Reset the idle time based on listed action
	 */
	idleTimer() {
		let self = this;

		let sessionExpire = function () {
			self.logout();
			window.location.reload(); //Reloads the current
		};

		let resetTimer = function () {
			if (self.isLoggedIn()) {
				clearTimeout(self.sessionTimer);
				self.sessionTimer = setTimeout(sessionExpire, self.sessionExpireTime); // time is in milliseconds (1000 is 1 second)
			}
		};

		// This code required in future process
		document.getElementsByTagName('input').onkeypress = resetTimer;
		window.onmousemove = resetTimer; // catches mouse movements
		window.onmousedown = resetTimer; // catches mouse movements
		window.onclick = resetTimer; // catches mouse clicks
		window.onscroll = resetTimer; // catches scrolling
		window.onkeypress = resetTimer; //catches keyboard
	}
}

export default new Authorization();
