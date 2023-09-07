import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Email, LocalPhone, LocationOn, NavigateNext } from '@mui/icons-material';
import Link from 'next/link';

export const Footer = () => {
	return (
		<Box component='footer' sx={{ backgroundColor: 'primary.main', padding: '15px' }}>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item>
					<Avatar
						src='/logo-vertical.png'
						alt='Logo The King of Beer'
						variant='square'
						sx={{ width: '100%', height: '160px' }}
					/>
				</Grid>

				<Grid item xs={12} sx={{ margin: '30px 0' }}>
					<Typography
						textAlign='center'
						sx={{ color: '#FFF', fontWeight: '700', fontSize: '20px' }}>
						{`Licorería "KB" los mejores precios al alcance de su bolsillo`}
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Grid
						container
						justifyContent='space-around'
						alignItems='flex-start'
						spacing={4}
						sx={{ padding: '50px' }}>
						<Grid item xs={12} md={4}>
							<Stack gap={2} justifyContent='center' alignItems='center'>
								<Box>
									<Typography
										className='footer-info'
										sx={{
											fontSize: { xs: '20px', lg: '24px' },
											fontWeight: '700',
										}}>
										Información de la tienda
									</Typography>

									<Divider
										sx={{
											backgroundColor: 'secondary.main',
											width: '100%',
											height: '5px',
											margin: '5px 0 10px',
										}}
									/>
								</Box>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<LocationOn />
									<Typography>Manta - Manabí - Ecuador</Typography>
								</Stack>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<LocalPhone />
									<Typography>0992100647</Typography>
								</Stack>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<Email />
									<Typography>thekingofbeer15@gmail.com</Typography>
								</Stack>
							</Stack>
						</Grid>

						<Grid item xs={12} md={4}>
							<Stack gap={2} justifyContent='center' alignItems='center'>
								<Box>
									<Typography
										className='footer-info'
										sx={{
											fontSize: { xs: '20px', lg: '24px' },
											fontWeight: '700',
										}}>
										Su cuenta
									</Typography>

									<Divider
										sx={{
											backgroundColor: 'secondary.main',
											width: '100%',
											height: '5px',
											margin: '5px 0 10px',
										}}
									/>
								</Box>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<Link href='/usuario'>
										<Button
											variant='text'
											color='secondary'
											sx={{ color: '#FFF' }}
											startIcon={<NavigateNext />}>
											Información personal
										</Button>
									</Link>
								</Stack>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<Link href='/usuario/pedidos'>
										<Button
											variant='text'
											color='secondary'
											sx={{ color: '#FFF' }}
											startIcon={<NavigateNext />}>
											Pedidos
										</Button>
									</Link>
								</Stack>
							</Stack>
						</Grid>

						<Grid item xs={12} md={4}>
							<Stack gap={2} justifyContent='center' alignItems='center'>
								<Box>
									<Typography
										className='footer-info'
										sx={{
											fontSize: { xs: '20px', lg: '24px' },
											fontWeight: '700',
										}}>
										Nuestra empresa
									</Typography>

									<Divider
										sx={{
											backgroundColor: 'secondary.main',
											width: '100%',
											height: '5px',
											margin: '5px 0 10px',
										}}
									/>
								</Box>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<Link href='/nosotros'>
										<Button
											variant='text'
											color='secondary'
											sx={{ color: '#FFF' }}
											startIcon={<NavigateNext />}>
											Quienes somos
										</Button>
									</Link>
								</Stack>

								<Stack flexDirection='row' gap={2} className='footer-info'>
									<Link href='/contactanos'>
										<Button
											variant='text'
											color='secondary'
											sx={{ color: '#FFF' }}
											startIcon={<NavigateNext />}>
											Contacte con nosotros
										</Button>
									</Link>
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
