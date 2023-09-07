import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { checkUserEmailPassword } from '../../../database/dbUsers';

export default NextAuth({
	providers: [
		Credentials({
			name: 'Custom Login',
			credentials: {
				email: { label: 'Correo', type: 'email', placeholder: 'Correo' },
				password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
			},
			async authorize(credentials) {
				return await checkUserEmailPassword(credentials.email, credentials.password);
			},
		}),
	],

	pages: {
		signIn: '/auth/iniciar-sesion',
		newUser: '/auth/registro',
	},

	session: {
		maxAge: 86400, /// cada 24h
		strategy: 'jwt',
		updateAge: 43200, // cada 12h
	},

	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				token.user = user;
			}

			return token;
		},

		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user;

			return session;
		},
	},
});
