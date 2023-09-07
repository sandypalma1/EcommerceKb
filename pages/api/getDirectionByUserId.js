import Directions from '../../models/Directions';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const { id } = req.query;

		await db.connect();

		const direction = await Directions.findOne({ idUser: id });

		await db.disconnect();

		res.status(200).json({ direction });
	} catch (error) {
		console.log(error);

		res.status(400).json({ direction: {} });
	}
}
