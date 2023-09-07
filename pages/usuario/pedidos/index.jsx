import { useEffect, useState } from 'react';
import { MainLayout } from '../../../components/layouts';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { AddShoppingCart, Info, PictureAsPdf } from '@mui/icons-material';

const PedidosPage = () => {
	const { data } = useSession();
	const [pedidos, setPedidos] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/facturas/getFacturasByUserId?id=${data?.user?._id}`)
			.then((resp) => setPedidos(resp.data.invoices))
			.catch((error) => console.log(error));
	}, [data]);

	return (
		<MainLayout>
			<Box sx={{ padding: '30px' }}>
				<Typography
					textAlign='center'
					sx={{
						color: '#575757',
						fontSize: '35px',
						fontWeight: '700',
					}}>
					Pedidos
				</Typography>

				{pedidos.length === 0 ? (
					<>
						<Stack
							justifyContent='center'
							alignItems='center'
							sx={{ padding: '80px 0' }}>
							<Info color='primary' sx={{ fontSize: '80px' }} />
							<Typography
								textAlign='center'
								sx={{
									color: '#575757',
									fontSize: '50px',
									fontWeight: '400',
									fontStyle: 'italic',
								}}>
								Aún no ha realizado ninguna compra
							</Typography>

							<Link href='/catalogo' style={{ marginTop: '30px' }}>
								<Button fullWidth variant='outlined' endIcon={<AddShoppingCart />}>
									Seguir comprando
								</Button>
							</Link>
						</Stack>
					</>
				) : (
					<>
						<Typography
							textAlign='center'
							sx={{
								color: '#575757',
								fontSize: '20px',
								fontWeight: '400',
								fontStyle: 'italic',
							}}>
							Total de pedidos: {pedidos.length}
						</Typography>
						{pedidos.map((pedido) => (
							<Paper
								elevation={4}
								key={pedido?._id}
								sx={{ margin: '15px 0', padding: '25px' }}>
								<Grid container justifyContent='center' alignItems='center'>
									<Grid item xs={12}>
										<Grid
											container
											justifyContent='space-between'
											alignItems='center'
											spacing={2}>
											<Grid item>
												<Typography
													sx={{ color: '#575757', fontWeight: '700' }}>
													Pedido realizado:{' '}
													<Box
														component='span'
														sx={{ fontWeight: '400' }}>
														{moment(pedido?.createdAt)
															.utc(true)
															.format('DD/MM/YYYY')}
													</Box>
												</Typography>
											</Grid>

											<Grid item>
												<Typography
													sx={{ color: '#575757', fontWeight: '700' }}>
													Total:{' '}
													<Box
														component='span'
														sx={{ fontWeight: '400' }}>
														$ {(pedido?.valorTotal).toFixed(2)}
													</Box>
												</Typography>
											</Grid>

											<Grid item>
												<Typography
													sx={{ color: '#575757', fontWeight: '700' }}>
													Dirección:{' '}
													<Box
														component='span'
														sx={{ fontWeight: '400' }}>
														{pedido?.direccion?.ciudad} -{' '}
														{pedido?.direccion?.codPostal}
													</Box>
												</Typography>
											</Grid>

											<Grid item>
												<Typography
													sx={{ color: '#575757', fontWeight: '700' }}>
													Número de factura:{' '}
													<Box
														component='span'
														sx={{ fontWeight: '400' }}>
														{pedido?.numFactura}
													</Box>
												</Typography>
											</Grid>
										</Grid>
									</Grid>

									<Divider
										sx={{ margin: '20px 0', width: '100%', borderWidth: '1px' }}
									/>

									<Grid item xs={12}>
										<Grid
											container
											justifyContent='space-between'
											alignItems='center'
											spacing={2}>
											{pedido?.products.map(
												({
													_id,
													category,
													product,
													image,
													cantCarrito,
												}) => (
													<Grid item xs={12} key={_id}>
														<Grid
															container
															justifyContent='space-between'
															alignItems='center'
															spacing={4}>
															<Grid item xs={12} md={8}>
																<Link
																	href={`/productos/${category}/${_id}`}>
																	<Grid
																		container
																		alignItems='center'
																		spacing={4}
																		sx={{
																			justifyContent: {
																				xs: 'center',
																				md: 'flex-start',
																			},
																		}}>
																		<Grid item>
																			<Avatar
																				src={image}
																				alt={product}
																				sx={{
																					'.css-1pqm26d-MuiAvatar-img':
																						{
																							objectFit:
																								'contain',
																						},
																				}}
																			/>
																		</Grid>
																		<Grid item>
																			<Typography>
																				{product}
																			</Typography>
																		</Grid>
																	</Grid>
																</Link>
															</Grid>
															<Grid item xs={12} md={4}>
																<Typography
																	textAlign='center'
																	sx={{
																		color: '#575757',
																		fontWeight: '700',
																	}}>
																	Cantidad:{' '}
																	<Box
																		component='span'
																		sx={{
																			fontWeight: '400',
																		}}>
																		{cantCarrito}
																	</Box>
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												)
											)}
										</Grid>
									</Grid>
								</Grid>
								<Grid
									item
									xs={12}
									sx={{
										display: 'flex',
										justifyContent: {
											xs: 'center',
											md: 'flex-end',
											padding: '20px 20px 0',
										},
									}}>
									<Link
										href={`/facturas/${pedido.numFactura}.pdf`}
										download
										target='_blank'>
										<Button
											fullWidth
											variant='contained'
											color='error'
											sx={{ fontSize: '12px' }}
											endIcon={<PictureAsPdf />}>
											Descargar factura
										</Button>
										{/* <IconButton>
											<PictureAsPdf color='error' sx={{ fontSize: '30px' }} />
										</IconButton> */}
									</Link>
								</Grid>
							</Paper>
						))}
					</>
				)}
			</Box>
		</MainLayout>
	);
};

export default PedidosPage;
