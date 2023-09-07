import { setLogin } from './authSlice';

export const setLoginAsync = (user) => {
	return async (dispatch) => {
		dispatch(setLogin(user));
	};
};
