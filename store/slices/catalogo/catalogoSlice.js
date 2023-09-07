import { createSlice } from '@reduxjs/toolkit';

export const catalogoSlice = createSlice({
	name: 'catalogo',
	initialState: {
		productFilter: [],
	},
	reducers: {
		setFilterCatalog: (state, { payload }) => {
			state.productFilter = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFilterCatalog } = catalogoSlice.actions;
