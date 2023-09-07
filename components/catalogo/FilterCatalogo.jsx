import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Collapse, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';

export const FilterCatalogo = () => {
	const [open, setOpen] = useState(true);
	const [allCategories, setAllCategories] = useState([]);
	const router = useRouter();
	const { category } = router.query;

	const handleClick = () => {
		setOpen(!open);
	};

	const handlePage = (category) => {
		router.push(`/catalogo/${category}`);
	};

	useEffect(() => {
		axios
			.get(`/api/getAllCategories`)
			.then((resp) => {
				setAllCategories(resp.data.categories);
			})
			.catch((error) => console.log(error));
	}, [category]);

	return (
		<List>
			<ListItemButton onClick={handleClick}>
				<ListItemText sx={{ margin: '0' }}>
					<Typography
						sx={{
							fontSize: '18px',
							color: '#575757',
							fontWeight: '600',
							textTransform: 'uppercase',
						}}>
						Categorías
					</Typography>

					<Divider
						sx={{
							backgroundColor: 'primary.main',
							width: '100%',
							height: '2px',
							margin: '5px 0 10px',
						}}
					/>
				</ListItemText>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{allCategories.map(({ id, name, totalItems }) => (
						<ListItemButton key={id} sx={{ pl: 4 }} onClick={() => handlePage(name)}>
							<ListItemText>
								<Typography
									sx={{ color: '#575757' }}
									className={name === category ? 'active-item' : null}>
									{name?.toUpperCase()} ({totalItems})
								</Typography>
							</ListItemText>
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</List>
	);
};
