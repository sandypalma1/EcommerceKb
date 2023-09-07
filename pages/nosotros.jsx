import { Avatar, Box, Paper, Typography, Grid, Stack } from '@mui/material';
import { MainLayout } from '../components/layouts';

const NosotrosPage = () => {
	return (
		<MainLayout>
			<Box
				sx={{
					padding: '50px 10%',
				}}>
				<Typography
					textAlign='center'
					sx={{
						color: '#575757',
						fontSize: '35px',
						fontWeight: '700',
						padding: '0 0 40px 0',
					}}>
					¿Quiénes somos?
				</Typography>

				<Grid container justifyContent='center' alignItems='center' spacing={4}>
					<Grid item xs={12}>
						<Typography
							textAlign='justify'
							sx={{ color: '#575757', fontSize: '20px', marginBottom: '15px' }}>
							Somos THE KING OF BEER, una tienda online de licores, que brinda
							satisfacer las necesidades de los clientes con productos de calidad al
							mejor precio y con el mejor servicio; generando crecimiento de la
							empresa.
						</Typography>

						<Typography textAlign='justify' sx={{ color: '#575757', fontSize: '20px' }}>
							THE KING OF BEER nacio en el año 2021, fue inagurado el 18 de octubre,
							debido a la pandemia de Covid-19 nació esta iniciativa, para que podamos
							activar los negocios ecuatorianos y avanzar juntos como emprendedores,
							empresarios, empresas locales apoyándonos unos a otros.
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography
							textAlign='center'
							sx={{ color: '#575757', fontSize: '26px', fontWeight: '700' }}>
							MISIÓN
						</Typography>
						<Typography textAlign='center' sx={{ color: '#575757', fontSize: '20px' }}>
							Garantizar a nuestro clientes innovacion, sastifacion y precios
							conveniente al momento de adquirir su producto.
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography
							textAlign='center'
							sx={{ color: '#575757', fontSize: '26px', fontWeight: '700' }}>
							VISIÓN
						</Typography>
						<Typography textAlign='center' sx={{ color: '#575757', fontSize: '20px' }}>
							Ser una empresa líder y mejor alternativa de compra en nuestra actividad
							comercial, superando los ingresos que fortalezcan el nivel economico.
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography
							textAlign='center'
							sx={{ color: '#575757', fontSize: '26px', fontWeight: '700' }}>
							UBICACIÓN
						</Typography>

						<Grid
							container
							justifyContent='center'
							alignItems='flex-start'
							spacing={4}
							sx={{ padding: '15px 0' }}>
							<Grid item xs={12} md={6}>
								<Paper elevation={4}>
									<Avatar
										src='/banners/location.png'
										variant='square'
										sx={{ width: '100%', height: 'auto' }}
									/>
								</Paper>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography
									textAlign='center'
									sx={{
										color: '#575757',
										padding: '5px',
										fontSize: '24px',
										fontWeight: '700',
									}}>
									MANTA - MANABÍ
								</Typography>
								<Typography
									textAlign='center'
									sx={{ color: '#575757', padding: '5px', fontSize: '20px' }}>
									Calle Bajo de la Palma y avenida 6 de marzo.
								</Typography>
								<Typography
									textAlign='center'
									sx={{ color: '#575757', padding: '5px', fontSize: '20px' }}>
									Correo: thekingofbeer15@gmail.com
								</Typography>
								<Typography
									textAlign='center'
									sx={{ color: '#575757', padding: '5px', fontSize: '20px' }}>
									Celular: 0992100647
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</MainLayout>
	);
};

export default NosotrosPage;
