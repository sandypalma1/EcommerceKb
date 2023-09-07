import Products from '../../models/Products';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const { category, order } = req.query;
		const page = parseInt(req.query.page);
		const limit = 12;
		const skip = (page - 1) * limit;

		await db.connect();

		const totalItems = await Products.count({ category });
		const products = await Products.find({ category })
			.sort({ salePrice: order || 'desc' })
			.skip(skip)
			.limit(limit);

		await db.disconnect();

		res.status(200).json({
			products,
			totalItems: Math.ceil(totalItems / limit),
		});
	} catch (error) {
		console.log(error);
	}
}
