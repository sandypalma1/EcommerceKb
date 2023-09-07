import { Avatar, Box, Typography } from '@mui/material';
import { MainLayout } from '../components/layouts';

const ConsumoResponsablePage = () => {
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
					Consumo responsable
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '35px',
						fontWeight: '700',
						padding: '20px 0',
					}}>
					Tips para disfrutar con responsabilidad de una bebida alcohólica:
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Esta página es sólo para mayores de edad. Por favor, si bebes no manejes,
					siempre puedes pedir un taxi, y seguir celebrando la vida. En The King of Beer
					apostamos por un consumo responsable.
					<Typography
						component='span'
						textAlign='justify'
						sx={{
							color: '#575757',
							paddingTop: '10px',
							fontSize: '18px',
							display: 'block',
						}}>
						Recuerde siempre los siguientes consejos para disfrutar una bebida
						alcohólica con responsabilidad:
					</Typography>
				</Typography>

				<Avatar
					src='/banners/consumo-responsable.jpg'
					variant='square'
					sx={{
						width: '100%',
						height: { xs: '200px', md: '400px' },
						margin: '20px 0',
						'.css-1pqm26d-MuiAvatar-img': {
							objectFit: 'contain',
						},
					}}
				/>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '35px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					Se sabio con tus medidas
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Tienes que estar consiente de cuanto es una unidad de alcohol y cuantas unidades
					de esta están en tu bebida. Esto le ayuda a monitorear la cantidad de alcohol
					que está consumiendo.
				</Typography>

				<Typography
					component='li'
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '25px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					¿Cuántas unidades tomar?
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					De 2 a 3 al día para una mujer y de 3 a 4 unidades al día para hombres. Una
					unidad va de 8 a 10ml de alcohol. Una bebida estándar de whisky contiene 25ml,
					mientras que una botella contiene 750ml. Datos proporcionados por el SWA. (The
					Scotch Whisky Association).
					<Typography
						component='span'
						textAlign='justify'
						sx={{
							color: '#575757',
							paddingTop: '10px',
							fontSize: '18px',
							display: 'block',
						}}>
						Ejemplo: Máximo un trago de cualquier bebida fuerte al día es recomendable.
					</Typography>
				</Typography>

				<Typography
					component='li'
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '25px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					Alterna
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Escoja entre agua o una bebida ligera entre sus bebidas alcohólicas.
				</Typography>

				<Typography
					component='li'
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '25px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					Algo para picar
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Esto le ayudará a disminuir la absorción de alcohol.
				</Typography>

				<Typography
					component='li'
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '25px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					Evite beber en un solo golpe (shots)
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Esto le ayuda a mantener un rastro de su consumo.
				</Typography>

				<Typography
					component='li'
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '25px',
						fontWeight: '700',
						padding: '20px 0 10px',
					}}>
					Llegue seguro a casa
				</Typography>

				<Typography
					textAlign='justify'
					sx={{
						color: '#575757',
						fontSize: '18px',
					}}>
					Piense como va a volver a su casa antes de salir. Coja un taxi o designe un
					conductor.
					<Typography
						component='span'
						textAlign='justify'
						sx={{
							color: '#575757',
							paddingTop: '10px',
							fontSize: '18px',
							display: 'block',
						}}>
						¡Saber beber es Saber disfrutar!
					</Typography>
				</Typography>
			</Box>
		</MainLayout>
	);
};

export default ConsumoResponsablePage;
