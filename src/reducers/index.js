import { combineReducers } from 'redux';
import {
	DEFAULT_STATE,
	DEFAULT_STATE_FF_EF,
	sidebarToggleItems,
} from '../utility/constants';

const createReducer = (reducerName, defaultStateParam) => {
	const defaultState = defaultStateParam || DEFAULT_STATE;
	return (state = defaultState, action) => {
		switch (action.type) {
			case `${reducerName}_PENDING`:
			case `${reducerName}_FULFILLED`:
			case `${reducerName}_REJECTED`:
				return Object.assign({}, action.payload);
			default:
				return state;
		}
	};
};

const createStaticReducer = (reducerName, defaultStateParam) => {
	const defaultState = defaultStateParam || DEFAULT_STATE;
	return (state = defaultState, action) => {
		switch (action.type) {
			case `${reducerName}`:
				return Object.assign({}, action.payload);
			default:
				return state;
		}
	};
};

const rootReducer = combineReducers({
	getAllEmployees: createReducer('GET_ALL_EMPLOYEE', DEFAULT_STATE_FF_EF),
});

export default rootReducer;
