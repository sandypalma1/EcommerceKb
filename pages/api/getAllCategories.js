import Categories from '../../models/Categories';
import Products from '../../models/Products';
import { db } from '../../utils';

export default async function handler(req, res) {
	try {
		const categories = [];
		await db.connect();

		const categoriesFilter = await Categories.find();

		for (const category of categoriesFilter) {
			const totalItems = await Products.count({ category: category?.name });
			categories.push({ id: category?._id, name: category?.name, totalItems });
		}

		await db.disconnect();

		res.status(200).json({ categories });
	} catch (error) {
		console.log(error);
	}
}
