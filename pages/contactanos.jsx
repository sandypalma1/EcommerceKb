import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from '@mui/icons-material';
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';

import { MainLayout } from '../components/layouts';

const ContactanosPage = () => {
	const [openMessage, setOpenMessage] = useState(false);
	const [message, setMessage] = useState({ value: '', color: '' });
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleCloseMessage = () => setOpenMessage(false);

	const handleSendMessage = async (data) => {
		try {
			const { data: resp } = await axios.post('/api/sendEmailContact', { ...data });
			setMessage(resp.message);
		} catch (error) {
			setMessage(error.response.data.message);
		}

		setOpenMessage(true);
		reset();
	};

	return (
		<MainLayout>
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
				onSubmit={handleSubmit(handleSendMessage)}
				sx={{
					padding: {
						xs: '50px 10%',
						sm: '50px 20%',
						md: '50px 10%',
						lg: '50px 20%',
						xl: '50px 30%',
					},
				}}>
				<Typography
					textAlign='center'
					sx={{
						color: '#575757',
						fontSize: '35px',
						fontWeight: '700',
						padding: '0 0 40px 0',
					}}>
					Contáctanos
				</Typography>

				<Grid container justifyContent='center' alignItems='center' spacing={4}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label='Nombres:'
							{...register('name', { required: '* Campo requerido.' })}
							error={!!errors?.name}
							helperText={errors?.name?.message || '* Campo requerido.'}
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label='Apellidos:'
							{...register('lastName', { required: '* Campo requerido.' })}
							error={!!errors?.lastName}
							helperText={errors?.lastName?.message || '* Campo requerido.'}
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							type='email'
							fullWidth
							label='Email:'
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

					<Grid item xs={12} md={6}>
						<TextField
							type='number'
							fullWidth
							label='Teléfono:'
							{...register('telefono', { required: '* Campo requerido.' })}
							error={!!errors?.telefono}
							helperText={errors?.telefono?.message || '* Campo requerido.'}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							label='Asunto:'
							{...register('asunto', { required: '* Campo requerido.' })}
							error={!!errors?.asunto}
							helperText={errors?.asunto?.message || '* Campo requerido.'}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							rows={4}
							label='Mensaje:'
							{...register('message', { required: '* Campo requerido.' })}
							error={!!errors?.message}
							helperText={errors?.message?.message || '* Campo requerido.'}
						/>
					</Grid>

					<Grid item xs={6} md={4}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}
							endIcon={<Send />}>
							Enviar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</MainLayout>
	);
};

export default ContactanosPage;
