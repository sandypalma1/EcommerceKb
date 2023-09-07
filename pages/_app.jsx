import '../styles/globals.css';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store/store';

import { AppTheme } from '../theme/AppTheme';

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<AppTheme>
					<Component {...pageProps} />
				</AppTheme>
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
