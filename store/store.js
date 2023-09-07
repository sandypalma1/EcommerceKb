import { configureStore } from '@reduxjs/toolkit';
import { catalogoSlice } from './slices/catalogo/catalogoSlice';
import { carritoSlice } from './slices/carrito/carritoSlice';
import { authSlice } from './slices/auth/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		catalogo: catalogoSlice.reducer,
		carrito: carritoSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
});
