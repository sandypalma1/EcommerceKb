import { useRouter } from 'next/router';
import {
	Avatar,
	Box,
	Button,
	Grid,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setCardProductsAsync } from '../../store/slices/carrito/thunks';

export const SingleItem = () => {
	const [singleProduct, setSingleProduct] = useState({});
	const router = useRouter();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			cantCarrito: 1,
		},
	});

	const { id } = router.query;

	const addCard = ({ cantCarrito }) => {
		const productCard = {
			...singleProduct,
			cantCarrito,
		};

		dispatch(setCardProductsAsync(productCard));
	};

	const handleAddCounter = () => {
		setValue('cantCarrito', getValues('cantCarrito') + 1);
	};

	const handleSubtractCounter = () => {
		if (getValues('cantCarrito') > 1) {
			setValue('cantCarrito', getValues('cantCarrito') - 1);
		}
	};

	useEffect(() => {
		if (!!id) {
			axios
				.get(`/api/getItemById?id=${id}`)
				.then((resp) => {
					setSingleProduct(resp.data.product);
				})
				.catch((error) => console.log(error));
		}
	}, [id]);

	return (
		<Grid container sx={{ padding: '25px' }}>
			<Grid
				item
				xs={12}
				sm={5}
				sx={{
					padding: '25px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Avatar
					src={singleProduct?.image}
					variant='square'
					sx={{
						width: '80%',
						height: { xs: '250px', sm: '500px' },
						borderRadius: '10px',
						// boxShadow: '0 8px 24px 5px rgba(0, 0, 0, 0.15)',
						'.css-1pqm26d-MuiAvatar-img': {
							objectFit: 'contain',
						},
					}}
				/>
			</Grid>

			<Grid item xs={12} sm={7} sx={{ padding: '25px' }}>
				<Stack gap={4}>
					<Typography
						sx={{
							color: '#575757',
							fontWeight: '700',
							textTransform: 'uppercase',
							fontSize: '28px',
							textAlign: { xs: 'center', sm: 'start' },
						}}>
						{singleProduct?.product}
					</Typography>

					<Typography
						color='primary'
						sx={{
							fontWeight: '700',
							fontSize: '50px',
							textAlign: { xs: 'center', sm: 'start' },
						}}>
						$ {singleProduct?.salePrice?.toFixed(2)}
					</Typography>

					<Typography
						sx={{
							color: '#888888',
							fontWeight: '700',
							fontSize: '20px',
						}}>
						En stock
					</Typography>

					<Box component='form' onSubmit={handleSubmit(addCard, singleProduct)}>
						<Grid
							container
							spacing={4}
							alignItems='center'
							sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
							<Grid item xs={12}>
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
										onClick={handleSubtractCounter}>
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
											autoFocus
											autoComplete='off'
											sx={{
												'.css-1x51dt5-MuiInputBase-input-MuiInput-input': {
													textAlign: 'center',
												},
											}}
											{...register('cantCarrito', {
												required: true,
												min: {
													value: 1,
													message: '* Mínimo debe agregar 1 ítem',
												},

												onBlur: (event) =>
													event.target.value.length === 0 ||
													parseInt(event.target.value) <= 0
														? setValue('cantCarrito', 1)
														: setValue(
																'cantCarrito',
																parseInt(event.target.value)
														  ),
											})}
										/>
									</ToggleButton>
									<ToggleButton
										value='right'
										aria-label='right aligned'
										onClick={handleAddCounter}>
										<Add color='primary' />
									</ToggleButton>
								</ToggleButtonGroup>
							</Grid>

							<Grid item xs={12} md={9} lg={6} xl={5}>
								<Button
									type='submit'
									size='small'
									variant='contained'
									startIcon={<ShoppingCart />}
									sx={{ width: '100%', color: '#FFF', padding: '8px' }}>
									Añadir al carrito
								</Button>
							</Grid>
						</Grid>
					</Box>

					<Box>
						<Typography
							sx={{
								color: '#575757',
								fontWeight: '700',
								textTransform: 'uppercase',
								fontSize: '24px',
							}}>
							Descripción
						</Typography>
						<Typography
							sx={{
								color: '#575757',
								fontWeight: '400',
								fontSize: '18px',
								marginTop: '10px',
							}}>
							{singleProduct?.product}
						</Typography>
					</Box>
				</Stack>
			</Grid>
		</Grid>
	);
};
