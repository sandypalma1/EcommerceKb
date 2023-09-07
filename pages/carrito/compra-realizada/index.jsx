import { useRouter } from 'next/router';
import { MainLayout } from '../../../components/layouts';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { clearCardProducts } from '../../../store/slices/carrito/carritoSlice';
import { CarritoCompraRealizada } from '../../../components/carrito/CarritoCompraRealizada';
import axios from 'axios';

const PurchasePage = () => {
	const router = useRouter();
	const [pdfDisable, setPdfDisable] = useState(true);
	const [openLoader, setOpenLoader] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { cardProducts } = useSelector((state) => state.carrito);
	const dispatch = useDispatch();

	const { success, numFactura } = router.query;

	const carrito = {
		amount: 0,
		total: 0,
	};

	for (const product of cardProducts) {
		carrito.amount += product.cantCarrito;
		carrito.total += product.cantCarrito * product.salePrice.toFixed(2);
	}

	useEffect(() => {
		setOpenLoader(true);
		if (success === 'ok') {
			axios
				.post('/api/facturas/setFacturas', {
					cardProducts,
					carrito,
					user,
					numFactura,
				})
				.then((resp) => {
					setPdfDisable(resp.data.isDownload);
					dispatch(clearCardProducts());
					Cookies.remove('cart');

					setTimeout(() => {
						setOpenLoader(false);
					}, 3000);
				})
				.catch((error) => {
					console.log(error);

					setOpenLoader(false);
				});
		}
	}, [success, dispatch, user]); //eslint-disable-line

	return (
		<MainLayout>
			<CarritoCompraRealizada
				openLoader={openLoader}
				numFactura={numFactura}
				pdfDisable={pdfDisable}
			/>
		</MainLayout>
	);
};

export default PurchasePage;
