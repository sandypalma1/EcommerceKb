import {
	Avatar,
	Box,
	Button,
	Collapse,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import { itemsMenu } from './sidebarItems';
import Link from 'next/link';
import {
	AccountCircle,
	ChevronLeft,
	ExpandLess,
	ExpandMore,
	HowToReg,
	LocalMall,
	Login,
	Logout,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';

export const Sidebar = ({ openDrawer, setOpenDrawer }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openCatalogo, setOpenCatalogo] = useState(false);
	const [allCategories, setAllCategories] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const open = Boolean(anchorEl);

	const handleClickCatalogo = () => {
		setOpenCatalogo(!openCatalogo);
	};

	const handleCloseSidebar = () => setOpenDrawer(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = () => {
		signOut();
	};

	useEffect(() => {
		axios
			.get(`/api/getAllCategories`)
			.then((resp) => {
				setAllCategories(resp.data.categories);
			})
			.catch((error) => console.log(error));
	}, [openCatalogo]);

	return (
		<Drawer
			open={openDrawer}
			anchor='left'
			onClose={handleCloseSidebar}
			sx={{
				'& .MuiDrawer-paper': {
					backgroundColor: 'secondary.main',
				},
			}}>
			<Box component='nav' sx={{ width: '250px' }}>
				<Stack
					justifyContent='center'
					alignItems='center'
					sx={{ backgroundColor: 'primary.main' }}>
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
						<Avatar
							src='/logo.png'
							alt='Logo The King of Beer'
							variant='square'
							sx={{ width: '100%', height: 'auto' }}
						/>
					</Box>
					<IconButton onClick={() => setOpenDrawer(false)}>
						<ChevronLeft sx={{ color: '#fff', fontSize: '2rem' }} />
					</IconButton>

					{user?.status === 'authenticated' ? (
						<Grid
							container
							justifyContent='center'
							alignItems='center'
							spacing={2}
							sx={{ padding: '10px 0' }}>
							<Grid item xs={8}>
								<Button fullWidth>
									<Avatar alt='Imagen usuario' />
								</Button>
							</Grid>

							<Grid item xs={8}>
								<Typography
									textAlign='center'
									sx={{ color: '#fff', fontStyle: 'italic' }}>
									{user?.name} {user?.lastName}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<List>
									<Link href='/usuario' onClick={handleCloseSidebar}>
										<ListItem>
											<ListItemButton
												sx={{ justifyContent: 'space-between' }}>
												<ListItemIcon
													sx={{ color: '#fff', fontWeight: '700' }}>
													<AccountCircle
														fontSize='small'
														sx={{ color: '#fff' }}
													/>
												</ListItemIcon>
												<ListItemText
													sx={{
														color: '#fff',
														'& .MuiTypography-root': {
															fontWeight: '700',
														},
													}}>
													Perfil
												</ListItemText>
											</ListItemButton>
										</ListItem>
									</Link>

									<Link href='/usuario/pedidos' onClick={handleCloseSidebar}>
										<ListItem>
											<ListItemButton>
												<ListItemIcon
													sx={{ color: '#fff', fontWeight: '700' }}>
													<LocalMall
														fontSize='small'
														sx={{ color: '#fff' }}
													/>
												</ListItemIcon>
												<ListItemText
													sx={{
														color: '#fff',
														'& .MuiTypography-root': {
															fontWeight: '700',
														},
													}}>
													Pedidos
												</ListItemText>
											</ListItemButton>
										</ListItem>
									</Link>

									<Link href='/' onClick={handleCloseSidebar}>
										<ListItem>
											<ListItemButton onClick={onLogout}>
												<ListItemIcon
													sx={{ color: '#fff', fontWeight: '700' }}>
													<Logout
														fontSize='small'
														sx={{ color: '#fff' }}
													/>
												</ListItemIcon>
												<ListItemText
													sx={{
														color: '#fff',
														'& .MuiTypography-root': {
															fontWeight: '700',
														},
													}}>
													Salir
												</ListItemText>
											</ListItemButton>
										</ListItem>
									</Link>
								</List>
							</Grid>
						</Grid>
					) : (
						<Grid
							container
							justifyContent='center'
							alignItems='center'
							sx={{ padding: '10px 0' }}>
							<Grid item xs={8}>
								<Link href='/auth/iniciar-sesion' onClick={handleCloseSidebar}>
									<MenuItem>
										<ListItemIcon>
											<Login fontSize='small' sx={{ color: '#fff' }} />
										</ListItemIcon>
										<ListItemText>
											<Typography sx={{ color: '#fff', fontWeight: '600' }}>
												Iniciar sesión
											</Typography>
										</ListItemText>
									</MenuItem>
								</Link>
							</Grid>

							<Grid item xs={8}>
								<Link href='/auth/registro' onClick={handleCloseSidebar}>
									<MenuItem>
										<ListItemIcon>
											<HowToReg fontSize='small' sx={{ color: '#fff' }} />
										</ListItemIcon>
										<ListItemText>
											<Typography sx={{ color: '#fff', fontWeight: '600' }}>
												Regístrate
											</Typography>
										</ListItemText>
									</MenuItem>
								</Link>
							</Grid>
						</Grid>
					)}
				</Stack>

				<Divider />
				<List>
					{itemsMenu.map(({ description, icon, path }) => (
						<Box key={path}>
							{path === '/catalogo' ? (
								<>
									<ListItem>
										<ListItemButton>
											<Link
												href={path}
												style={{ display: 'flex' }}
												onClick={handleCloseSidebar}>
												<ListItemIcon
													sx={{ color: '#fff', fontWeight: '700' }}>
													{icon}
												</ListItemIcon>
												<ListItemText
													sx={{
														color: '#fff',
														'& .MuiTypography-root': {
															fontWeight: '700',
														},
													}}>
													{description}
												</ListItemText>
											</Link>

											<ListItemIcon
												onClick={handleClickCatalogo}
												sx={{
													color: '#fff',
													fontWeight: '700',
													marginLeft: '20px',
												}}>
												{openCatalogo ? <ExpandLess /> : <ExpandMore />}
											</ListItemIcon>
										</ListItemButton>
									</ListItem>
									<Collapse in={openCatalogo} timeout='auto' unmountOnExit>
										<List component='div' disablePadding>
											{allCategories.map(({ id, name, totalItems }) => (
												<Link
													href={`/catalogo/${name}`}
													key={id}
													onClick={handleCloseSidebar}>
													<ListItemButton key={id} sx={{ pl: 4 }}>
														<ListItemText>
															<Typography
																sx={{
																	color: '#fff',
																	textTransform: 'capitalize',
																	fontWeight: '600',
																}}>
																{name} ({totalItems})
															</Typography>
														</ListItemText>
													</ListItemButton>
												</Link>
											))}
										</List>
									</Collapse>
								</>
							) : (
								<Link href={path} onClick={handleCloseSidebar}>
									<ListItem>
										<ListItemButton>
											<ListItemIcon sx={{ color: '#fff', fontWeight: '700' }}>
												{icon}
											</ListItemIcon>
											<ListItemText
												sx={{
													color: '#fff',
													'& .MuiTypography-root': {
														fontWeight: '700',
													},
												}}>
												{description}
											</ListItemText>
										</ListItemButton>
									</ListItem>
								</Link>
							)}
						</Box>
					))}
				</List>
			</Box>
		</Drawer>
	);
};
