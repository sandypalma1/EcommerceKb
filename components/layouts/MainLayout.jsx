import Head from 'next/head';
import { Box } from '@mui/material';

import { Navbar } from '../navbar/Navbar';
import { Footer } from '../main';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setCardProductsCookies } from '../../store/slices/carrito/thunks';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { setLoginAsync } from '../../store/slices/auth/thunks';
import axios from 'axios';
import { setUserDirection } from '../../store/slices/auth/authSlice';

export const MainLayout = ({ children }) => {
	const dispatch = useDispatch();
	const { data, status } = useSession();
	const maxHeight = '191px';

	useEffect(() => {
		if (status === 'authenticated') {
			const user = { ...data?.user, status };
			dispatch(setLoginAsync(user));

			axios
				.get(`/api/getDirectionByUserId?id=${data?.user?._id}`)
				.then((resp) => dispatch(setUserDirection(resp.data.direction)))
				.catch((error) => console.log(error));
		}
	}, [data, status, dispatch]);

	useEffect(() => {
		const cookiesProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
		dispatch(setCardProductsCookies(cookiesProducts));
	}, [dispatch]);

	return (
		<>
			<Head>
				<title>The King of Beer</title>
				<meta
					name='description'
					content='Ecommerce The King of Beer, tienda de bebidas alcohólicas'
				/>
				<link rel='icon' href='/favicon2.png' />
			</Head>

			<main>
				<Navbar maxHeight={maxHeight} />

				<Box
					sx={{
						margin: '0 auto',
						marginTop: { xs: '160px', sm: maxHeight },
						width: '90%',
					}}>
					{children}
				</Box>
			</main>

			<Footer />
		</>
	);
};
