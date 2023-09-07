import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Appbar } from './Appbar';

export const Navbar = ({ maxHeight }) => {
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			<Appbar maxHeight={maxHeight} setOpenDrawer={setOpenDrawer} />
			<Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
		</>
	);
};
