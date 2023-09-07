import Products from '../../models/Products';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		await db.connect();
		const products = await Products.find();

		await db.disconnect();

		const allProducts = products.map(({ _id, product, category }) => ({
			title: product,
			_id,
			category,
		}));

		res.status(200).json({ allProducts });
	} catch (error) {
		console.log(error);
	}
}
