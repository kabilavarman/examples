import RequestFactory from '../utility/requestFactory';
import {
	DEFAULT_STATE,
	DEFAULT_STATE_FF_EF,
	DEFAULT_STATE_FF_ET,
} from '../utility/constants';

export default function callAPIMiddleware({ dispatch, getState }) {
	return (next) => (action) => {
		const {
			types,
			method = 'GET',
			url,
			data = {},
			queryParams = {},
			service = 'baseApi',
			requestBodyType = 'Json',
			payload = {},
			returnExistObject,
		} = action;

		if (!types) {
			// Normal action: pass it on
			return next(action);
		}

		if (
			!Array.isArray(types) ||
			types.length !== 3 ||
			!types.every((type) => typeof type === 'string')
		) {
			throw new Error('Expected an array of three string types.');
		}
		const [requestType, successType, failureType] = types;

		// Check the given 'returnExistObject' exist in state or not
		// If exist and response status is success, then return the same state, do not call the API
		if (returnExistObject) {
			const state = getState();
			const existObject = state[returnExistObject];
			if (
				existObject.response &&
				Object.keys(existObject.response).length > 0 &&
				existObject.status === 200
			) {
				// Normal action: pass it on
				action = {
					type: successType,
					payload: existObject,
				};
				return next(action);
			}
		}

		// Check whether given URL is valid or not
		if (!url && typeof url !== 'string') {
			throw new Error(
				'URL must not be empty and Expected callAPI to be a string',
			);
		}

		const pending = Object.assign({}, payload, DEFAULT_STATE, {
			method: method,
		});

		dispatch({
			type: requestType,
			payload: pending,
		});
		// Call the API request
		return RequestFactory.withRequestBodyType(requestBodyType)
			.withService(service)
			.call(
				method,
				url,
				data,
				(response) => {
					// Success status
					if (response && response.status >= 200 && response.status <= 300) {
						// Success dispatch
						const success = Object.assign(
							{},
							payload,
							DEFAULT_STATE_FF_EF,
							{ status: response.status },
							{
								response: response.body || [],
							},
							{ method: method },
						);

						dispatch({
							type: successType,
							payload: success,
						});
					}
					// else if(response && response.status === 401){ // Token expired status
					//     dispatch({
					//         type: `${LOGOUT}_${FULFILLED}`,
					//         payload: Object.assign({},{response},{response:{logout:true}})
					//     })
					// }
					else {
						// Other errors dispatch action
						const error = Object.assign(
							{},
							payload,
							DEFAULT_STATE_FF_ET,
							{ status: response.status },
							{
								response: response.body || [],
							},
							{ method: method },
						);

						dispatch({
							type: failureType,
							payload: error,
						});
					}
				},
				(response) => {
					// After integrated the login process, remove this code
					// Un-comment the below code
					const error = Object.assign(
						{},
						payload,
						DEFAULT_STATE_FF_ET,
						{ status: response.status },
						{
							response: response.body || [],
						},
						{ method: method },
					);

					dispatch({
						type: failureType,
						payload: error,
					});
					// After integrated the login process
					// Un-comment the below code

					// if(response && response.status === 401){ // Token expired status
					//     dispatch({
					//         type: `${LOGOUT}_${FULFILLED}`,
					//         payload: Object.assign({},{response},{response:{logout:true}})
					//     })
					// }
					// else{ // Other errors dispatch action
					//     const error = Object.assign({}, payload, DEFAULT_STATE_FF_ET, {
					//                     response
					//                 },{method:method})
					//     dispatch({
					//         type: failureType,
					//         payload: error
					//     })
					// }
				},
				queryParams,
			);
	};
}
