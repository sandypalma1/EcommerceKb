import { Ballot, GridView, HowToReg, HowToVote } from '@mui/icons-material';

export const itemsMenu = [
	{
		icon: <GridView />,
		description: 'Catálogo',
		path: '/catalogo',
	},
	{
		icon: <HowToVote />,
		description: 'Consumo Responsable',
		path: '/consumo-responsable',
	},
	{
		icon: <Ballot />,
		description: 'Nosotros',
		path: '/nosotros',
	},
	{
		icon: <HowToReg />,
		description: 'Contáctanos',
		path: '/contactanos',
	},
];
