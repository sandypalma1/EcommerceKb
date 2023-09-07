import { Box, Grid, Paper, Typography } from '@mui/material';

import { CarritoListProducts } from './CarritoListProducts';
import { CarritoResumenProducts } from './CarritoResumenProducts';

export const CarritoContainer = () => {
	return (
		<Box sx={{ padding: '25px' }}>
			<Typography
				textAlign='center'
				sx={{
					fontSize: '36px',
					fontWeight: '700',
					color: '#575757',
					padding: '20px',
				}}>
				Carrito de compras
			</Typography>

			<Grid container spacing={2} sx={{ marginBottom: '20px' }}>
				<Grid item xs={12} lg={8} sx={{ order: { xs: 1, lg: 0 } }}>
					<Paper elevation={4} sx={{ padding: '15px' }}>
						<CarritoListProducts />
					</Paper>
				</Grid>

				<Grid item xs={12} lg={4}>
					<Paper elevation={4} sx={{ padding: '15px' }}>
						<CarritoResumenProducts />
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};
