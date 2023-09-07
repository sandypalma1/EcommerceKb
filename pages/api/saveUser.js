import bcrypt from 'bcrypt';

import Users from '../../models/User';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const { name, lastName, email, password } = req.body;

		await db.connect();

		const user = await Users.findOne({ email });

		if (user) {
			return res.status(400).json({
				message: {
					value: 'El correo ya está registrado.',
					color: 'error',
				},
			});
		}

		const newUser = new Users({
			name,
			lastName,
			email: email.toLocaleLowerCase(),
			password: bcrypt.hashSync(password, 10),
		});

		await newUser.save({ validateBeforeSave: true });

		await db.disconnect();

		return res.status(200).json({
			message: {
				value: `Usuario registrado correctamente.`,
				color: 'success',
			},
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: {
				value: 'Ocurrió un problema al registrarse.',
				color: 'error',
			},
		});
	}
}
