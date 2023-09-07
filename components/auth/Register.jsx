import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
	Alert,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export const Register = () => {
	const [openMessage, setOpenMessage] = useState(false);
	const [message, setMessage] = useState({ value: '', color: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	const handleCloseMessage = () => setOpenMessage(false);

	const handleRegister = async ({ name, lastName, email, password }) => {
		try {
			const { data } = await axios.post('/api/saveUser', { name, lastName, email, password });
			setMessage(data.message);
		} catch (error) {
			setMessage(error.response.data.message);
		}

		setOpenMessage(true);
		reset();

		signIn('credentials', { email, password, redirect: false }).then(async ({ ok, error }) => {
			if (ok) {
				router.push('/');
			} else {
				console.log(error);
			}
		});
	};

	return (
		<>
			<Snackbar
				open={openMessage}
				autoHideDuration={4000}
				onClose={handleCloseMessage}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert
					onClose={handleCloseMessage}
					severity={message.color || 'info'}
					sx={{ width: '100%' }}>
					{message.value}
				</Alert>
			</Snackbar>

			<Grid
				component='form'
				container
				flexDirection='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
				onSubmit={handleSubmit(handleRegister)}>
				<Grid item xs={12} lg={6}>
					<TextField
						type='text'
						variant='outlined'
						fullWidth
						label='Nombres:'
						{...register('name', { required: '* Campo requerido.' })}
						error={!!errors?.name}
						helperText={errors?.name?.message || '* Campo requerido.'}
					/>
				</Grid>

				<Grid item xs={12} lg={6}>
					<TextField
						type='text'
						variant='outlined'
						fullWidth
						label='Apellidos:'
						{...register('lastName', { required: '* Campo requerido.' })}
						error={!!errors?.lastName}
						helperText={errors?.lastName?.message || '* Campo requerido.'}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						type='text'
						variant='outlined'
						fullWidth
						label='Correo electrónico:'
						{...register('email', {
							required: '* Campo requerido.',
							pattern: {
								value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
								message: '* Email no válido',
							},
						})}
						error={!!errors?.email}
						helperText={errors?.email?.message || '* Campo requerido.'}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						type={showPassword ? 'text' : 'password'}
						variant='outlined'
						fullWidth
						label='Contraseña:'
						{...register('password', {
							required: '* Campo requerido.',
							pattern: {
								value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
								message:
									'* La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.',
							},
						})}
						error={!!errors?.password}
						helperText={errors?.password?.message || '* Campo requerido.'}
						InputProps={{
							endAdornment: (
								<InputAdornment sx={{ padding: '25px 0 16px' }} position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						type={showConfirmPassword ? 'text' : 'password'}
						variant='outlined'
						fullWidth
						label='Confirmar contraseña:'
						{...register('confirmPassword', {
							required: '* Campo requerido.',
							validate: (value, formValues) =>
								value === formValues.password
									? true
									: '* Las contraseñas no coinciden',
						})}
						error={!!errors?.confirmPassword}
						helperText={errors?.confirmPassword?.message || '* Campo requerido.'}
						InputProps={{
							endAdornment: (
								<InputAdornment sx={{ padding: '25px 0 16px' }} position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowConfirmPassword}>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<Stack justifyContent='center' alignItems='center' gap={1}>
						<Link href='/auth/iniciar-sesion'>
							<Typography textAlign='center' sx={{ textDecoration: 'underline' }}>
								¿Ya tienes una cuenta? Inicia Sesión
							</Typography>
						</Link>
					</Stack>
				</Grid>
				<Grid item xs={10} sm={6}>
					<Button
						type='submit'
						color='secondary'
						variant='contained'
						fullWidth
						sx={{ color: '#FFF', fontWeight: '700' }}>
						Registrarse
					</Button>
				</Grid>
			</Grid>
		</>
	);
};
