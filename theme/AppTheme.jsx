import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

export const AppTheme = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
