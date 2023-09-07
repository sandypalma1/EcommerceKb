import { createSlice } from '@reduxjs/toolkit';

export const carritoSlice = createSlice({
	name: 'carrito',
	initialState: {
		cardProducts: [],
		currentFactura: '',
	},
	reducers: {
		setCardProducts: (state, { payload }) => {
			state.cardProducts = payload;
		},
		clearCardProducts: (state) => {
			state.cardProducts = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCardProducts, clearCardProducts } = carritoSlice.actions;
