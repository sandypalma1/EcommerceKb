import {
	Add,
	AddShoppingCart,
	DeleteTwoTone,
	ProductionQuantityLimits,
	Remove,
} from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteItemCardProduct,
	setCounterCardProduct,
	setValueCardProduct,
} from '../../store/slices/carrito/thunks';
import Link from 'next/link';

export const CarritoListProducts = () => {
	const { cardProducts } = useSelector((state) => state.carrito);
	const dispatch = useDispatch();

	const handleAddCounter = (id) => {
		dispatch(setCounterCardProduct(1, id));
	};

	const handleSubtractCounter = (id, cantCarrito) => {
		if (cantCarrito > 1) {
			dispatch(setCounterCardProduct(-1, id));
		}
	};

	const handleChangeInputCard = ({ target }, id) => {
		dispatch(setValueCardProduct(parseInt(target.value), id));
	};

	const deleteProductCard = (id) => {
		dispatch(deleteItemCardProduct(id));
	};

	return (
		<Grid container justifyContent='center' alignItems='center'>
			{cardProducts.length === 0 ? (
				<Grid item xs={12}>
					<Stack flexDirection='row' justifyContent='center' alignItems='center' gap={2}>
						<Typography
							textAlign='center'
							sx={{
								fontSize: '30px',
								fontWeight: '700',
								color: '#575757',
								margin: '20px 0',
							}}>
							Carrito vacío
						</Typography>
						<ProductionQuantityLimits sx={{ fontSize: '30px', color: '#575757' }} />
					</Stack>
				</Grid>
			) : (
				<>
					<Grid item xs={12} sx={{ marginBottom: '15px' }}>
						<Typography
							textAlign='center'
							sx={{ fontSize: '20px', fontWeight: '700', color: '#575757' }}>
							Productos
						</Typography>
					</Grid>

					{cardProducts.map(({ _id, product, image, salePrice, cantCarrito }, index) => (
						<Box key={_id} sx={{ width: '100%' }}>
							<Grid item xs={12}>
								<Grid
									container
									justifyContent='space-between'
									alignItems='center'
									sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
									<Grid
										item
										xs={4}
										md={1}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											margin: { xs: '5px 0', md: '0' },
										}}>
										<Avatar
											src={image}
											alt={product}
											variant='square'
											sx={{
												width: '100%',
												height: '100px',
												'.css-1pqm26d-MuiAvatar-img': {
													objectFit: 'contain',
												},
											}}
										/>
									</Grid>
									<Grid item xs={10} md={4}>
										<Box>
											<Typography
												sx={{
													fontWeight: '400',
													color: '#575757',
													fontSize: '18px',
													textAlign: { xs: 'center', md: 'start' },
												}}>
												{product}
											</Typography>
											<Typography
												sx={{
													fontWeight: '700',
													color: '#575757',
													fontSize: '20px',
													textAlign: { xs: 'center', md: 'start' },
												}}>
												$ {salePrice.toFixed(2)}
											</Typography>
										</Box>
									</Grid>

									<Grid
										item
										xs={10}
										md={4}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											margin: { xs: '5px 0', md: '0' },
										}}>
										<ToggleButtonGroup
											exclusive
											aria-label='text alignment'
											sx={{
												width: {
													xs: '100%',
													sm: '200px',
												},
											}}>
											<ToggleButton
												value='left'
												aria-label='left aligned'
												onClick={() =>
													handleSubtractCounter(_id, cantCarrito)
												}>
												<Remove color='primary' />
											</ToggleButton>
											<ToggleButton
												value='center'
												aria-label='centered'
												disableRipple>
												<TextField
													type='number'
													variant='standard'
													color='primary'
													fullWidth
													autoComplete='off'
													sx={{
														'.css-1x51dt5-MuiInputBase-input-MuiInput-input':
															{
																textAlign: 'center',
															},
													}}
													value={cantCarrito}
													onChange={(event) =>
														handleChangeInputCard(event, _id)
													}
													onFocus={(event) => event.target.select()}
												/>
											</ToggleButton>
											<ToggleButton
												value='right'
												aria-label='right aligned'
												onClick={() => handleAddCounter(_id)}>
												<Add color='primary' />
											</ToggleButton>
										</ToggleButtonGroup>
									</Grid>

									<Grid item xs={10} md={2}>
										<Typography
											textAlign='end'
											sx={{
												fontSize: '22px',
												fontWeight: '700',
												color: '#575757',
											}}>
											$ {(cantCarrito * salePrice.toFixed(2)).toFixed(2)}
										</Typography>
									</Grid>

									<Grid
										item
										xs={10}
										md={1}
										sx={{ margin: { xs: '10px 0', md: '0' } }}>
										<Stack
											flexDirection='row'
											justifyContent='center'
											alignItems='center'>
											<IconButton
												onClick={() => deleteProductCard(_id)}
												sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
												<DeleteTwoTone
													color='error'
													sx={{ fontSize: '40px' }}
												/>
											</IconButton>

											<Button
												variant='contained'
												color='error'
												onClick={() => deleteProductCard(_id)}
												sx={{ display: { xs: 'inline-flex', md: 'none' } }}
												endIcon={<DeleteTwoTone />}>
												Eliminar
											</Button>
										</Stack>
									</Grid>
								</Grid>
							</Grid>

							{index < cardProducts.length - 1 && (
								<Divider sx={{ borderWidth: '1px', margin: '10px 0' }} />
							)}
						</Box>
					))}
				</>
			)}

			<Grid item xs={10} md={5} sx={{ marginTop: '30px' }}>
				<Link href='/catalogo'>
					<Button fullWidth variant='outlined' endIcon={<AddShoppingCart />}>
						Seguir comprando
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};
