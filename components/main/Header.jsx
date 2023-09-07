import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
	Autocomplete,
	Avatar,
	Badge,
	Box,
	Button,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	AccountCircle,
	HowToReg,
	LocalMall,
	Login,
	Logout,
	MenuOutlined,
	Person,
	Search,
	ShoppingCart,
} from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export const Header = ({ setOpenDrawer, maxHeight }) => {
	const [allProducts, setAllProducts] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const { user } = useSelector((state) => state.auth);
	const { cardProducts } = useSelector((state) => state.carrito);
	const router = useRouter();
	const open = Boolean(anchorEl);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		signOut();
	};

	const searchGlobal = ({ search }) => {
		const product = allProducts.find((product) => product.title === search);

		product
			? router.push(`/productos/${product?.category}/${product?._id}`)
			: router.replace('/');
	};

	const options = allProducts.map((option) => {
		const firstLetter = option.title[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

	useEffect(() => {
		axios
			.get(`/api/getAllProducts`)
			.then((resp) => {
				setAllProducts(resp.data.allProducts);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<Stack
				flexDirection='row'
				justifyContent='space-around'
				alignItems='center'
				sx={{ width: '100%', maxHeight: `calc(${maxHeight} - 81px)`, padding: '10px' }}>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={() => setOpenDrawer(true)}
					edge='start'
					sx={{
						display: { xs: 'flex', md: 'none' },
						gap: '5px',
						padding: '15px',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<MenuOutlined
						sx={{ color: '#fff', fontSize: { xs: '2.5rem', sm: '1.5rem' } }}
					/>
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: '700',
							color: '#fff',
							display: { xs: 'none', sm: 'block' },
						}}>
						Menú
					</Typography>
				</IconButton>

				<Box
					sx={{
						width: '15%',
						maxWidth: '240px',
						minWidth: '150px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '10px 0',
					}}>
					<Link href='/'>
						<Avatar
							src='/logo.png'
							alt='Logo The King of Beer'
							variant='square'
							sx={{ width: '100%', height: 'auto' }}
						/>
					</Link>
				</Box>

				<Paper
					component='form'
					onSubmit={handleSubmit(searchGlobal)}
					sx={{
						p: '2px 4px',
						display: { xs: 'none', md: 'flex' },
						alignItems: 'center',
						width: '30%',
					}}>
					<Autocomplete
						id='free-solo-demo'
						freeSolo
						sx={{ ml: 1, flex: 1, padding: '10px' }}
						options={options.sort(
							(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
						)}
						groupBy={(option) => option.firstLetter}
						getOptionLabel={(option) => option.title}
						renderInput={(params) => (
							<TextField
								variant='standard'
								{...params}
								{...register('search')}
								placeholder='Buscar...'
								autoComplete='off'
							/>
						)}
						renderGroup={(params) => (
							<List component='div' key={params.key}>
								<ListItem component='div'>
									<Typography
										color='primary'
										sx={{
											fontWeight: '700',
											fontSize: '18px',
										}}>
										{params.group}
									</Typography>
								</ListItem>
								<ListItem component='div'>
									<Typography
										sx={{
											color: '#575757',
											fontWeight: '400',
											fontSize: '16px',
										}}>
										{params.children}
									</Typography>
								</ListItem>
							</List>
						)}
					/>
					<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
						<Search />
					</IconButton>
				</Paper>

				<Stack
					gap={2}
					flexDirection='row-reverse'
					justifyContent='center'
					alignItems='center'>
					<Box sx={{ display: { xs: 'none', md: 'block' } }}>
						{user?.status === 'authenticated' ? (
							<>
								<Button onClick={handleClick}>
									<Avatar alt='Imagen usuario' />
								</Button>

								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}>
									<MenuItem onClick={handleClose}>
										<ListItemText
											sx={{ color: '#575757', fontStyle: 'italic' }}>
											{user?.name} {user?.lastName}
										</ListItemText>
									</MenuItem>
									<Link href='/usuario'>
										<MenuItem onClick={handleClose}>
											<ListItemIcon>
												<AccountCircle fontSize='small' />
											</ListItemIcon>
											<ListItemText sx={{ color: '#575757' }}>
												Perfil
											</ListItemText>
										</MenuItem>
									</Link>
									<Link href='/usuario/pedidos'>
										<MenuItem onClick={handleClose}>
											<ListItemIcon>
												<LocalMall fontSize='small' />
											</ListItemIcon>
											<ListItemText sx={{ color: '#575757' }}>
												Pedidos
											</ListItemText>
										</MenuItem>
									</Link>
									<Link href='/'>
										<MenuItem onClick={onLogout}>
											<ListItemIcon>
												<Logout fontSize='small' />
											</ListItemIcon>
											<ListItemText sx={{ color: '#575757' }}>
												Salir
											</ListItemText>
										</MenuItem>
									</Link>
								</Menu>
							</>
						) : (
							<>
								<Button
									id='basic-menu'
									startIcon={<Person />}
									color='secondary'
									variant='text'
									onClick={handleClick}
									sx={{ color: '#FFF' }}>
									Ingresar
								</Button>
								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}>
									<Link href='/auth/iniciar-sesion'>
										<MenuItem onClick={handleClose}>
											<ListItemIcon>
												<Login fontSize='small' />
											</ListItemIcon>
											<ListItemText sx={{ color: '#575757' }}>
												Iniciar sesión
											</ListItemText>
										</MenuItem>
									</Link>
									<Link href='/auth/registro'>
										<MenuItem onClick={handleClose}>
											<ListItemIcon>
												<HowToReg fontSize='small' />
											</ListItemIcon>
											<ListItemText sx={{ color: '#575757' }}>
												Regístrate
											</ListItemText>
										</MenuItem>
									</Link>
								</Menu>
							</>
						)}
					</Box>

					<Link href='/carrito'>
						<Button variant='text'>
							<Grid container spacing={2} alignItems='center' justifyContent='center'>
								<Grid item>
									<Badge badgeContent={cardProducts.length} color='secondary'>
										<ShoppingCart
											sx={{
												color: '#FFF',
												fontSize: { xs: '2.5rem', sm: '1.5rem' },
											}}
										/>
									</Badge>
								</Grid>
								<Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
									<Typography sx={{ color: '#FFF', fontWeight: '700' }}>
										Carrito
									</Typography>
								</Grid>
							</Grid>
						</Button>
					</Link>
				</Stack>
			</Stack>

			<Box
				sx={{
					width: { xs: '80%', sm: '60%' },
					display: { xs: 'flex', md: 'none' },
					padding: { xs: '10px', sm: '16.5px' },
				}}>
				<Paper
					component='form'
					onSubmit={handleSubmit(searchGlobal)}
					sx={{
						display: 'flex',
						alignItems: 'center',
						padding: '2px 4px',
						width: '100%',
						flexGrow: 100,
					}}>
					<Autocomplete
						id='free-solo-demo'
						freeSolo
						sx={{ ml: 1, flex: 1, padding: '10px' }}
						options={options.sort(
							(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
						)}
						groupBy={(option) => option.firstLetter}
						getOptionLabel={(option) => option.title}
						renderInput={(params) => (
							<TextField
								variant='standard'
								{...params}
								{...register('search')}
								placeholder='Buscar...'
								autoComplete='off'
							/>
						)}
						renderGroup={(params) => (
							<List component='div' key={params.key}>
								<ListItem component='div'>
									<Typography
										color='primary'
										sx={{
											fontWeight: '700',
											fontSize: '18px',
										}}>
										{params.group}
									</Typography>
								</ListItem>
								<ListItem component='div'>
									<Typography
										sx={{
											color: '#575757',
											fontWeight: '400',
											fontSize: '16px',
										}}>
										{params.children}
									</Typography>
								</ListItem>
							</List>
						)}
					/>
					<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
						<Search />
					</IconButton>
				</Paper>
			</Box>
		</>
	);
};
