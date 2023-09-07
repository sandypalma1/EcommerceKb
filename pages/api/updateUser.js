import Users from '../../models/User';
import { db } from '../../utils';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
	try {
		const { dataUser } = req.body;

		console.log(dataUser);

		await db.connect();

		const user = await Users.findOne({ email: dataUser.email });

		if (user) {
			if (dataUser.lastPassword) {
				const validPassword = bcrypt.compareSync(dataUser.lastPassword, user.password);

				if (validPassword) {
					await Users.updateOne(
						{ email: dataUser.email },
						{
							name: dataUser.name,
							lastName: dataUser.lastName,
							password: bcrypt.hashSync(dataUser.newPassword, 10),
						}
					);
				} else {
					return res.status(400).json({
						message: {
							value: `Contraseña actual incorrecta.`,
							color: 'error',
						},
					});
				}
			} else {
				await Users.updateOne(
					{ email: dataUser.email },
					{
						name: dataUser.name,
						lastName: dataUser.lastName,
					}
				);
			}

			await db.disconnect();

			return res.status(200).json({
				message: {
					value: 'Datos del usuario actualizados correctamente.',
					color: 'success',
				},
			});
		}

		await db.disconnect();

		return res.status(400).json({
			message: {
				value: `Ocurrió un error al actualizar el usuario.`,
				color: 'error',
			},
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: {
				value: `Ocurrió un error al actualizar el usuario.`,
				color: 'error',
			},
		});
	}
}
