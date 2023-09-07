import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Header, MenuItems } from '../main';

export const Appbar = ({ maxHeight, setOpenDrawer }) => {
	return (
		<AppBar position='fixed' open={true} sx={{ maxHeight: maxHeight }}>
			<Toolbar disableGutters sx={{ flexDirection: 'column' }}>
				<Header setOpenDrawer={setOpenDrawer} maxHeight={maxHeight} />
				<MenuItems maxHeight={maxHeight} />
			</Toolbar>
		</AppBar>
	);
};
