import { Grid } from '@mui/material';
import React from 'react';
import { FilterCatalogo } from './FilterCatalogo';
import { ShowCatalogo } from './ShowCatalogo';

export const CatalogoContainer = () => {
	return (
		<Grid
			container
			sx={{
				padding: '50px 0',
			}}>
			<Grid item xs={12} sm={4} md={3} lg={2}>
				<FilterCatalogo />
			</Grid>
			<Grid item xs={12} sm={8} md={9} lg={10}>
				<ShowCatalogo />
			</Grid>
		</Grid>
	);
};
