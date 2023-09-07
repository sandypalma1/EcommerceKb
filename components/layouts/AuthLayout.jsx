import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';

export const AuthLayout = ({ children, title }) => {
	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			gap={2}
			sx={{
				height: 'auto',
				minHeight: { xs: 'calc(100vh - 160px)', md: 'calc(100vh - 191px)' },
				padding: { xs: '20px 10% 40px', xl: '20px 20% 40px' },
			}}>
			<Grid item xs={12} md={8} sx={{ height: 'auto' }}>
				<Paper elevation={4} sx={{ padding: { xs: '20px', sm: '50px' }, height: '100%' }}>
					<Grid
						container
						flexDirection='row'
						justifyContent='center'
						alignItems='center'
						spacing={4}>
						<Grid item xs={12}>
							<Typography
								textAlign='center'
								color='#575757'
								sx={{ fontWeight: '700', fontSize: { xs: '30px', sm: '40px' } }}>
								{title}
							</Typography>
							<Divider
								sx={{
									backgroundColor: 'primary.main',
									width: '50%',
									maxWidth: '180px',
									minWidth: '100px',
									height: '6px',
									margin: '0 auto',
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							{children}
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
