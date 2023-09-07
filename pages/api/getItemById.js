import Products from '../../models/Products';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const { id } = req.query;

		await db.connect();

		const product = await Products.findById(id);

		await db.disconnect();

		res.status(200).json({ product });
	} catch (error) {
		console.log(error);
	}
}
