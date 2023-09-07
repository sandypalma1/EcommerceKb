import Cookies from 'js-cookie';
import { setCardProducts } from './carritoSlice';

export const setCardProductsAsync = (productCard) => {
	return async (dispatch, getState) => {
		const { cardProducts } = getState().carrito;

		const productInCard = cardProducts.some((item) => item._id === productCard._id);

		if (!productInCard) {
			dispatch(setCardProducts([...cardProducts, productCard]));
			Cookies.set('cart', JSON.stringify([...cardProducts, productCard]));

			return;
		}

		const updatedProducts = cardProducts.map((product) => {
			if (product._id !== productCard._id) return product;

			const newProduct = {
				...product,
				cantCarrito: product.cantCarrito + productCard.cantCarrito,
			};

			return newProduct;
		});

		dispatch(setCardProducts(updatedProducts));
		Cookies.set('cart', JSON.stringify(updatedProducts));
	};
};

export const setCardProductsCookies = (productCard) => {
	return async (dispatch) => {
		dispatch(setCardProducts(productCard));
	};
};

export const setCounterCardProduct = (counter, id) => {
	return async (dispatch, getState) => {
		const { cardProducts } = getState().carrito;

		const updatedProducts = cardProducts.map((product) => {
			if (product._id !== id) return product;

			const newProduct = {
				...product,
				cantCarrito: parseInt(product.cantCarrito) + counter,
			};

			return newProduct;
		});

		dispatch(setCardProducts(updatedProducts));
		Cookies.set('cart', JSON.stringify(updatedProducts));
	};
};

export const setValueCardProduct = (amount, id) => {
	return async (dispatch, getState) => {
		const { cardProducts } = getState().carrito;

		const updatedProducts = cardProducts.map((product) => {
			if (product._id !== id) return product;

			const newProduct = {
				...product,
				cantCarrito: isNaN(amount) ? product.cantCarrito : amount,
			};

			return newProduct;
		});

		dispatch(setCardProducts(updatedProducts));
		Cookies.set('cart', JSON.stringify(updatedProducts));
	};
};

export const deleteItemCardProduct = (id) => {
	return async (dispatch, getState) => {
		const { cardProducts } = getState().carrito;

		const updatedProducts = cardProducts.filter((product) => product._id !== id);

		dispatch(setCardProducts(updatedProducts));
		Cookies.set('cart', JSON.stringify(updatedProducts));
	};
};
