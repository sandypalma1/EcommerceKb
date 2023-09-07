import { ShoppingCart } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCardProductsAsync } from '../../store/slices/carrito/thunks';

export const Item = ({ item, gridItems = null }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { _id, product, salePrice, image, category } = item;

	const handlePage = () => {
		router.push(`/productos/${category}/${_id}`);
	};

	const addCart = () => {
		const productCard = {
			...item,
			cantCarrito: 1,
		};

		dispatch(setCardProductsAsync(productCard));
	};

	return (
		<>
			<ContainerItem gridItems={gridItems}>
				<Card sx={{ maxWidth: 300, margin: '0 auto' }}>
					<CardActionArea onClick={handlePage}>
						<CardMedia
							component='img'
							alt={product}
							height='240'
							image={image}
							sx={{ objectFit: 'contain' }}
						/>

						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='p'
								textAlign='center'
								sx={{ fontSize: '14px', color: '#575757' }}>
								{product}
							</Typography>

							<Typography
								textAlign='center'
								sx={{
									fontSize: '22px',
									fontWeight: '700',
									color: 'primary.main',
								}}>
								$ {salePrice.toFixed(2)}
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions sx={{ padding: '0' }}>
						<Button
							size='small'
							variant='contained'
							startIcon={<ShoppingCart />}
							onClick={addCart}
							sx={{
								width: '100%',
								color: '#FFF',
								padding: '8px',
								borderTopLeftRadius: '15px',
								borderTopRightRadius: '15px',
							}}>
							Añadir al carrito
						</Button>
					</CardActions>
				</Card>
			</ContainerItem>
		</>
	);
};

export const ContainerItem = ({ children, gridItems }) => {
	return (
		<>
			{gridItems === 'grid' ? (
				<Grid item xs={12} md={6} lg={4} xl={3}>
					{children}
				</Grid>
			) : gridItems === 'list' ? (
				<Grid item xs={12}>
					{children}
				</Grid>
			) : (
				<Grid item xs={12} md={6} lg={4} xl={3}>
					{children}
				</Grid>
			)}
		</>
	);
};
