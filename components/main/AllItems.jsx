import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Grid, Pagination, Stack } from '@mui/material';
import axios from 'axios';

import { Item } from './';
import { setFilterCatalog } from '../../store/slices/catalogo/catalogoSlice';
import { BannerSlide } from './BannerSlide';

export const AllItems = ({ isBanner, category = null, gridItems = null }) => {
	const [countProducts, setCountProducts] = useState(0);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const { productFilter } = useSelector((state) => state.catalogo);

	const handleChangePage = (event, value) => {
		setPage(value);
		window.scrollTo({
			top: 0,
			behavior: 'auto',
		});
	};

	useEffect(() => {
		if (!category) {
			axios
				.get(`/api/getProductsPagination?page=${page}`)
				.then((resp) => {
					setCountProducts(resp.data.totalItems);
					dispatch(setFilterCatalog(resp.data.products));
				})
				.catch((error) => console.log(error));
		} else {
			axios
				.get(`/api/getProductByCategory?page=${page}&category=${category}`)
				.then((resp) => {
					setCountProducts(resp.data.totalItems);
					dispatch(setFilterCatalog(resp.data.products));
				})
				.catch((error) => console.log(error));
		}
	}, [page, category, dispatch]);

	return (
		<Box sx={{ padding: '20px' }}>
			{isBanner && <BannerSlide />}

			<Box sx={{ margin: '50px 0' }}>
				<Grid container spacing={4} alignItems='center' justifyContent='center'>
					{productFilter.map((product) => (
						<Item key={product.id} item={product} gridItems={gridItems} />
					))}
				</Grid>
			</Box>

			<Box sx={{ width: '100%', marginBottom: '20px' }}>
				<Stack spacing={2}>
					<Pagination
						count={countProducts}
						variant='text'
						color='primary'
						showFirstButton
						showLastButton
						onChange={handleChangePage}
						sx={{
							// '.css-nhb8h9': {
							// 	justifyContent: 'center',
							// },
							'.css-wjh20t-MuiPagination-ul': {
								justifyContent: 'center',
							},
						}}
					/>
				</Stack>
			</Box>
		</Box>
	);
};
