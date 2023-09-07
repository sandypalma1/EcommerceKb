import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
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
import { LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const Login = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);
	const [message, setMessage] = useState('');

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleCloseMessage = () => setOpenMessage(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleLogin = ({ email, password }) => {
		signIn('credentials', { email, password, redirect: false }).then(async ({ ok, error }) => {
			if (ok) {
				router.push('/');
			} else {
				setMessage('Usuario y/o contraseña incorrecta.');
				setOpenMessage(true);
				reset();
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
				<Alert onClose={handleCloseMessage} severity='error' sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>

			<Grid
				component='form'
				container
				flexDirection='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
				onSubmit={handleSubmit(handleLogin)}>
				<Grid item xs={12} sm={10} lg={7}>
					<TextField
						type='email'
						variant='outlined'
						fullWidth
						autoFocus
						label='Correo electrónico:'
						{...register('email', { required: true })}
					/>
				</Grid>
				<Grid item xs={12} sm={10} lg={7}>
					<TextField
						type={showPassword ? 'text' : 'password'}
						variant='outlined'
						fullWidth
						label='Contraseña:'
						{...register('password', { required: true })}
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
				<Grid item xs={10} sm={8} lg={6}>
					<Button
						type='submit'
						color='secondary'
						variant='contained'
						fullWidth
						startIcon={<LoginOutlined />}
						sx={{ color: '#FFF', fontWeight: '700', padding: '10px' }}>
						Iniciar sesión
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Stack justifyContent='center' alignItems='center' gap={2}>
						{/* <Link href='/'>
							<Typography textAlign='center' sx={{ textDecoration: 'underline' }}>
								¿Has olvidado la contraseña?
							</Typography>
						</Link> */}
						<Link href='/auth/registro'>
							<Typography textAlign='center' sx={{ textDecoration: 'underline' }}>
								¿No tienes una cuenta? Regístrate
							</Typography>
						</Link>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};
