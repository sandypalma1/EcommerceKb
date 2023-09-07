import { createTheme } from '@mui/material';

export const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "'Raleway', sans-serif",
		},
	},
	palette: {
		primary: {
			main: '#DA8E2C',
		},
		secondary: {
			main: '#3A393B',
		},
		success: {
			main: '#53AE71',
		},
		error: {
			main: '#C23030',
		},
	},
});
