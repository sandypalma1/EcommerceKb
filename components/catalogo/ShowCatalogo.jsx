import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
	Box,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { GridView, ViewList } from '@mui/icons-material';
import axios from 'axios';

import { AllItems } from '../main';
import { setFilterCatalog } from '../../store/slices/catalogo/catalogoSlice';
import { useEffect, useState } from 'react';

export const ShowCatalogo = () => {
	const [gridItems, setGridItems] = useState('grid');
	const [order, setOrder] = useState('desc');
	const router = useRouter();
	const dispatch = useDispatch();

	const { category } = router.query;

	const handleChangeOrder = (event) => {
		const { value } = event.target;
		setOrder(value);

		axios
			.get(`/api/getProductByCategory?order=${value}&category=${category}`)
			.then((resp) => {
				dispatch(setFilterCatalog(resp.data.products));
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		setOrder('desc');
	}, [category]);

	return (
		<Box sx={{ padding: '16px' }}>
			<Typography
				sx={{
					fontSize: '18px',
					color: '#575757',
					fontWeight: '600',
					textTransform: 'uppercase',
				}}>
				Todos los productos
			</Typography>

			<Divider
				sx={{
					backgroundColor: 'primary.main',
					width: '100%',
					height: '2px',
					margin: '5px 0 10px',
				}}
			/>

			{!!category && (
				<Grid container spacing={4} alignItems='center' justifyContent='center'>
					<Grid item xs={12} sm={5} md={6}>
						<TextField
							variant='standard'
							select
							label='Ordenar por:'
							fullWidth
							name='order'
							value={order}
							onChange={handleChangeOrder}>
							<MenuItem value='desc'>Precio: alto a bajo</MenuItem>
							<MenuItem value='asc'>Precio: bajo a alto</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12} sm={7} md={6}>
						<Stack flexDirection='row' justifyContent='end' alignItems='center'>
							<IconButton onClick={() => setGridItems('grid')}>
								<GridView />
							</IconButton>

							<IconButton onClick={() => setGridItems('list')}>
								<ViewList />
							</IconButton>
						</Stack>
					</Grid>
				</Grid>
			)}

			<AllItems isBanner={false} category={category} gridItems={gridItems} />
		</Box>
	);
};
