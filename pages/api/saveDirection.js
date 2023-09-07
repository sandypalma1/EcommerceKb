import Directions from '../../models/Directions';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const {
			idUser,
			fullName,
			cedula,
			email,
			direccion,
			referencia,
			provincia,
			ciudad,
			codPostal,
			telefono,
		} = req.body;

		await db.connect();

		const direction = await Directions.findOne({ idUser });

		if (direction) {
			await Directions.updateOne(
				{ idUser },
				{
					fullName,
					cedula,
					email,
					direccion,
					referencia,
					provincia,
					ciudad,
					codPostal,
					telefono,
				}
			);

			return res.status(200).json({
				message: 'Dirección actualizada',
			});
		}

		const newDirection = new Directions({
			idUser,
			fullName,
			cedula,
			email,
			direccion,
			referencia,
			provincia,
			ciudad,
			codPostal,
			telefono,
		});

		await newDirection.save({ validateBeforeSave: true });

		await db.disconnect();

		return res.status(200).json({
			message: `Dirección registrada correctamente.`,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: 'Revisar logs del servidor',
		});
	}
}
