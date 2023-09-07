import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { MainLayout } from '../../../components/layouts';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavigateNext } from '@mui/icons-material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Loading } from '../../../components/Loading';

const DireccionPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { user, userDirection } = useSelector((state) => state.auth);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm();

	const handleDireccion = async (data) => {
		const idUser = user?._id;
		const { data: resp } = await axios.post('/api/saveDirection', { ...data, idUser });

		console.log(resp);
		router.push('/carrito');
		reset();
	};

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		const fullName = userDirection
			? userDirection?.fullName
			: `${user?.name} ${user?.lastName}`;

		const email = userDirection ? userDirection?.email : user?.email;

		setValue('fullName', fullName);
		setValue('email', email);

		if (userDirection) {
			setValue('cedula', userDirection?.cedula);
			setValue('direccion', userDirection?.direccion);
			setValue('referencia', userDirection?.referencia);
			setValue('provincia', userDirection?.provincia);
			setValue('ciudad', userDirection?.ciudad);
			setValue('codPostal', userDirection?.codPostal);
			setValue('telefono', userDirection?.telefono);
		}
	}, [user, userDirection, setValue]);

	return (
		<MainLayout>
			{isLoading ? (
				<Loading />
			) : (
				<Box sx={{ padding: '50px 20px' }}>
					<Stack flexDirection='row' justifyContent='center' alignItems='center'>
						<Typography
							sx={{
								color: '#575757',
								fontSize: '35px',
								fontWeight: '700',
								padding: '0 0 40px 0',
							}}>
							Dirección de envío
						</Typography>
					</Stack>

					<Box component='form' onSubmit={handleSubmit(handleDireccion)}>
						<Grid container justifyContent='center' alignItems='center' spacing={4}>
							<Grid item xs={10} lg={4} xl={6}>
								<TextField
									fullWidth
									label='Nombre completo:'
									variant='filled'
									{...register('fullName', { required: '* Campo requerido.' })}
									error={!!errors?.fullName}
									helperText={errors?.fullName?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={4} xl={2}>
								<TextField
									type='number'
									fullWidth
									variant='filled'
									label='Cédula / RUC:'
									{...register('cedula', { required: '* Campo requerido.' })}
									error={!!errors?.cedula}
									helperText={errors?.cedula?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={4} xl={4}>
								<TextField
									type='email'
									fullWidth
									variant='filled'
									label='Email:'
									{...register('email', { required: '* Campo requerido.' })}
									error={!!errors?.email}
									helperText={errors?.email?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} lg={6}>
								<TextField
									fullWidth
									variant='filled'
									label='Dirección:'
									{...register('direccion', { required: '* Campo requerido.' })}
									error={!!errors?.direccion}
									helperText={errors?.direccion?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} lg={6}>
								<TextField
									fullWidth
									variant='filled'
									label='Referencia:'
									{...register('referencia', { required: '* Campo requerido.' })}
									error={!!errors?.referencia}
									helperText={errors?.referencia?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={6}>
								<TextField
									fullWidth
									variant='filled'
									label='Provincia:'
									{...register('provincia', { required: '* Campo requerido.' })}
									error={!!errors?.provincia}
									helperText={errors?.provincia?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={6}>
								<TextField
									fullWidth
									variant='filled'
									label='Ciudad:'
									{...register('ciudad', { required: '* Campo requerido.' })}
									error={!!errors?.ciudad}
									helperText={errors?.ciudad?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={6}>
								<TextField
									type='number'
									fullWidth
									variant='filled'
									label='Código postal:'
									{...register('codPostal', { required: '* Campo requerido.' })}
									error={!!errors?.codPostal}
									helperText={errors?.codPostal?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} md={5} lg={6}>
								<TextField
									type='number'
									fullWidth
									variant='filled'
									label='Número de teléfono:'
									{...register('telefono', { required: '* Campo requerido.' })}
									error={!!errors?.telefono}
									helperText={errors?.telefono?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={10} sm={4} lg={2}>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									endIcon={<NavigateNext />}
									sx={{ color: '#fff', fontWeight: '700' }}>
									Siguiente
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</MainLayout>
	);
};

export default DireccionPage;
