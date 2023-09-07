import Invoices from '../../../models/Invoices';
import { db } from '../../../utils';

export default async function handler(req, res) {
	try {
		const { id } = req.query;

		await db.connect();

		const invoices = await Invoices.find({ idUser: id });

		await db.disconnect();

		res.status(200).json({ invoices });
	} catch (error) {
		console.log(error);

		res.status(400).json({ invoices: {} });
	}
}
