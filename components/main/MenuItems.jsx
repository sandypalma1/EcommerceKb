import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	Box,
	ClickAwayListener,
	Grid,
	Grow,
	IconButton,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Stack,
} from '@mui/material';

import { itemsMenu } from '../navbar/sidebarItems';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const MenuItems = ({ maxHeight }) => {
	const router = useRouter();
	const anchorRef = useRef(null);

	const [open, setOpen] = useState(false);
	const [allCategories, setAllCategories] = useState([]);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	};

	const handlePage = (category) => {
		router.push(`/catalogo/${category}`);
		setOpen(false);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	useEffect(() => {
		axios
			.get(`/api/getAllCategories`)
			.then((resp) => {
				setAllCategories(resp.data.categories);
			})
			.catch((error) => console.log(error));
	}, [open]);

	return (
		<Box
			component='nav'
			sx={{
				display: { xs: 'none', md: 'block' },
				maxheight: `calc(${maxHeight} - 110px)`,
				width: '100%',
			}}>
			<Grid
				container
				sx={{
					backgroundColor: 'secondary.main',
					height: '100%',
					padding: '10px',
				}}
				justifyContent='space-evenly'
				alignItems='center'>
				{itemsMenu.map(({ description, path }) => (
					<Grid item key={path}>
						<Stack flexDirection='row' justifyContent='center' alignItems='center'>
							<Link
								href={path}
								className={`menu-item ${router.pathname === path ? 'active' : ''}`}>
								{description}
							</Link>

							{path === '/catalogo' && (
								<>
									<IconButton
										ref={anchorRef}
										onClick={handleToggle}
										id='composition-button'
										aria-controls={open ? 'composition-menu' : undefined}
										aria-expanded={open ? 'true' : undefined}
										aria-haspopup='true'>
										<KeyboardArrowDown sx={{ color: '#fff' }} />
									</IconButton>

									<Popper
										open={open}
										anchorEl={anchorRef.current}
										role={undefined}
										placement='bottom-start'
										transition
										disablePortal
										sx={{
											width: '50%',
										}}>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{
													transformOrigin:
														placement === 'bottom-start'
															? 'left top'
															: 'left bottom',
												}}>
												<Paper
													sx={{
														padding: '25px',
														boxSizing: 'border-box',
													}}>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList
															autoFocusItem={open}
															id='composition-menu'
															aria-labelledby='composition-button'
															onKeyDown={handleListKeyDown}>
															<Grid container>
																{allCategories.map(
																	({ id, name }) => (
																		<Grid item key={id} xs={4}>
																			<MenuItem
																				onClick={() =>
																					handlePage(name)
																				}>
																				{name.toUpperCase()}
																			</MenuItem>
																		</Grid>
																	)
																)}
															</Grid>
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>
								</>
							)}
						</Stack>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
