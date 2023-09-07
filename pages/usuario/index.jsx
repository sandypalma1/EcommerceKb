import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { Cached, ExpandMore, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Loading } from '../../components/Loading';
import axios from 'axios';
import { signOut } from 'next-auth/react';

const UserPage = () => {
	const [openMessage, setOpenMessage] = useState(false);
	const [message, setMessage] = useState({ value: '', color: '' });
	const [isChangePassword, setIsChangePassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	const handleCloseMessage = () => setOpenMessage(false);

	const handleUpdateUser = async (data) => {
		try {
			if (
				data?.lastPassword.length === 0 ||
				data?.newPassword.length === 0 ||
				data?.confirmPassword.length === 0
			) {
				delete data?.lastPassword;
				delete data?.newPassword;
				delete data?.confirmPassword;
			}

			const { data: resp } = await axios.post('/api/updateUser', { dataUser: data });

			setMessage(resp.message);

			signOut();
		} catch (error) {
			setMessage(error.response.data.message);
		}

		setOpenMessage(true);
		reset();
	};

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	}, []);

	useEffect(() => {
		setValue('name', user?.name);
		setValue('lastName', user?.lastName);
		setValue('email', user?.email);
	}, [user, setValue]);

	return (
		<MainLayout>
			{isLoading ? (
				<Loading />
			) : (
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

					<Box
						component='form'
						onSubmit={handleSubmit(handleUpdateUser)}
						sx={{ padding: { xs: '10px', md: '50px 20%', lg: '50px 30%' } }}>
						<Typography
							textAlign='center'
							sx={{
								color: '#575757',
								fontSize: '35px',
								fontWeight: '700',
								padding: '0 0 40px 0',
							}}>
							Información personal
						</Typography>

						<Grid container justifyContent='center' alignItems='center' spacing={4}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									variant='filled'
									label='Nombre:'
									{...register('name', { required: '* Campo requerido' })}
									error={!!errors?.name}
									helperText={errors?.name?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									variant='filled'
									label='Apellido:'
									{...register('lastName', { required: '* Campo requerido' })}
									error={!!errors?.lastName}
									helperText={errors?.lastName?.message || '* Campo requerido.'}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									variant='filled'
									label='Email:'
									disabled
									{...register('email', {
										required: '* Campo requerido',
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
								<Accordion>
									<AccordionSummary
										onClick={() => setIsChangePassword((open) => !open)}
										expandIcon={<ExpandMore />}
										aria-controls='panel1a-content'
										id='panel1a-header'>
										<Typography
											sx={{
												color: '#575757',
											}}>
											Cambiar contraseña:
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid
											container
											justifyContent='center'
											alignItems='center'
											spacing={4}>
											<Grid item xs={12}>
												<TextField
													type={showPassword ? 'text' : 'password'}
													fullWidth
													variant='filled'
													label='Contraseña actual:'
													{...register('lastPassword', {
														required: isChangePassword
															? '* Campo requerido'
															: false,
													})}
													InputProps={{
														endAdornment: (
															<InputAdornment
																sx={{ padding: '25px 0 16px' }}
																position='end'>
																<IconButton
																	aria-label='toggle password visibility'
																	onClick={
																		handleClickShowPassword
																	}>
																	{showPassword ? (
																		<VisibilityOff />
																	) : (
																		<Visibility />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
													error={!!errors?.lastPassword}
													helperText={
														errors?.lastPassword?.message ||
														'* Campo requerido.'
													}
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													type={showNewPassword ? 'text' : 'password'}
													fullWidth
													variant='filled'
													label='Nueva contraseña:'
													{...register('newPassword', {
														required: isChangePassword
															? '* Campo requerido'
															: false,
														pattern: isChangePassword
															? {
																	value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
																	message:
																		'* La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.',
															  }
															: false,
													})}
													InputProps={{
														endAdornment: (
															<InputAdornment
																sx={{ padding: '25px 0 16px' }}
																position='end'>
																<IconButton
																	aria-label='toggle password visibility'
																	onClick={
																		handleClickShowNewPassword
																	}>
																	{showNewPassword ? (
																		<VisibilityOff />
																	) : (
																		<Visibility />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
													error={!!errors?.newPassword}
													helperText={
														errors?.newPassword?.message ||
														'* Campo requerido.'
													}
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													type={showConfirmPassword ? 'text' : 'password'}
													fullWidth
													variant='filled'
													label='Confirmar nueva contraseña:'
													{...register('confirmPassword', {
														required: isChangePassword
															? '* Campo requerido'
															: false,
														validate: isChangePassword
															? (value, formValues) =>
																	value === formValues.newPassword
																		? true
																		: '* Las contraseñas no coinciden'
															: false,
													})}
													InputProps={{
														endAdornment: (
															<InputAdornment
																sx={{ padding: '25px 0 16px' }}
																position='end'>
																<IconButton
																	aria-label='toggle password visibility'
																	onClick={
																		handleClickShowConfirmPassword
																	}>
																	{showConfirmPassword ? (
																		<VisibilityOff />
																	) : (
																		<Visibility />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
													error={!!errors?.confirmPassword}
													helperText={
														errors?.confirmPassword?.message ||
														'* Campo requerido.'
													}
												/>
											</Grid>
										</Grid>
									</AccordionDetails>
								</Accordion>
							</Grid>

							<Grid item xs={10} sm={6} md={5}>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									endIcon={<Cached />}
									sx={{ color: '#fff', fontWeight: '700' }}>
									Actualizar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</>
			)}
		</MainLayout>
	);
};

export default UserPage;
