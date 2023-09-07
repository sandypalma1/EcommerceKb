import { AddCircle, NavigateNext, PlaceRounded } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export const CarritoResumenProducts = () => {
	const { userDirection } = useSelector((state) => state.auth);
	const { cardProducts } = useSelector((state) => state.carrito);
	const router = useRouter();
	const { data, status } = useSession();

	const carrito = {
		amount: 0,
		total: 0,
	};

	for (const product of cardProducts) {
		carrito.amount += product.cantCarrito;
		carrito.total += product.cantCarrito * product.salePrice.toFixed(2);
	}

	const handleCompra = async () => {
		const itemsPago = cardProducts.map(({ product, cantCarrito, salePrice }) => ({
			price_data: {
				product_data: {
					name: product,
				},
				currency: 'usd',
				unit_amount: salePrice.toFixed(2) * 100,
			},
			quantity: cantCarrito,
		}));

		const { data } = await axios.post('/api/stripe/create-checkout-session', { itemsPago });
		router.replace(data.url);
	};

	return (
		<>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				sx={{ marginBottom: '15px' }}>
				{status === 'authenticated' && (
					<Box>
						<Typography
							textAlign='center'
							sx={{
								fontSize: '20px',
								fontWeight: '700',
								color: '#575757',
								marginBottom: '15px',
							}}>
							Dirección
						</Typography>

						{userDirection ? (
							<Link href='/carrito/direccion'>
								<Button fullWidth startIcon={<PlaceRounded />}>
									<Typography
										sx={{
											color: '#575757',
											fontSize: '14px',
											fontWeight: '400',
										}}>
										{userDirection?.ciudad} {userDirection?.codPostal}
									</Typography>
								</Button>
							</Link>
						) : (
							<Link href='/carrito/direccion'>
								<Button fullWidth startIcon={<AddCircle />}>
									Agregar una dirección
								</Button>
							</Link>
						)}
					</Box>
				)}
			</Grid>

			<Typography
				textAlign='center'
				sx={{
					fontSize: '20px',
					fontWeight: '700',
					color: '#575757',
					marginBottom: '15px',
				}}>
				Resumen
			</Typography>

			<Box sx={{ padding: '10px' }}>
				<Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
					<Typography
						textAlign='start'
						sx={{ fontSize: '16px', fontWeight: '700', color: '#575757' }}>
						Total artículos ({carrito.amount})
					</Typography>

					<Typography
						textAlign='end'
						sx={{ fontSize: '16px', fontWeight: '400', color: '#575757' }}>
						$ {carrito.total.toFixed(2)}
					</Typography>
				</Stack>

				<Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
					<Typography
						textAlign='start'
						sx={{ fontSize: '16px', fontWeight: '700', color: '#575757' }}>
						Envío
					</Typography>

					<Typography
						textAlign='end'
						sx={{ fontSize: '16px', fontWeight: '400', color: '#575757' }}>
						Por calcular
					</Typography>
				</Stack>

				<Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
					<Typography
						textAlign='start'
						sx={{ fontSize: '16px', fontWeight: '700', color: '#575757' }}>
						Tiempo de entrega
					</Typography>

					<Typography
						textAlign='end'
						sx={{ fontSize: '16px', fontWeight: '400', color: '#575757' }}>
						24 horas. (máximo)
					</Typography>
				</Stack>

				<Divider sx={{ borderWidth: '1px', margin: '10px 0' }} />

				<Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
					<Typography
						textAlign='start'
						sx={{ fontSize: '16px', fontWeight: '700', color: '#575757' }}>
						Total (impuestos inc.)
					</Typography>

					<Typography
						textAlign='end'
						sx={{ fontSize: '16px', fontWeight: '400', color: '#575757' }}>
						$ {carrito.total.toFixed(2)}
					</Typography>
				</Stack>

				{status === 'authenticated' ? (
					<>
						{userDirection && (
							<>
								{cardProducts.length > 0 && (
									<Stack
										flexDirection='row'
										justifyContent='center'
										alignItems='center'
										sx={{ marginTop: '25px' }}>
										<Button
											variant='contained'
											onClick={handleCompra}
											sx={{ color: '#fff', fontWeight: '700' }}
											endIcon={<NavigateNext />}>
											Continuar a caja
										</Button>
									</Stack>
								)}
							</>
						)}
					</>
				) : (
					<Stack
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						sx={{ marginTop: '25px' }}>
						<Typography
							textAlign='center'
							sx={{
								fontSize: '14px',
								color: '#575757',
								fontStyle: 'italic',
								marginBottom: '10px',
							}}>
							Para continuar con la compra debe iniciar sesión.
						</Typography>
						<Link href='/auth/iniciar-sesion'>
							<Button
								variant='contained'
								sx={{ color: '#fff', fontWeight: '700' }}
								endIcon={<NavigateNext />}>
								Iniciar sesión
							</Button>
						</Link>
					</Stack>
				)}
			</Box>
		</>
	);
};
