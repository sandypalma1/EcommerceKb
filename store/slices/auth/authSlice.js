import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		userDirection: null,
	},
	reducers: {
		setLogin: (state, { payload }) => {
			state.user = payload;
		},
		setUserDirection: (state, { payload }) => {
			state.userDirection = payload;
		},
		setLogout: (state) => {
			state.user = null;
		},
		clearUserDirection: (state) => {
			state.userDirection = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setUserDirection, clearUserDirection } = authSlice.actions;
