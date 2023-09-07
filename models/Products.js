import { Schema, model, models } from 'mongoose';

const ProductsSchema = new Schema({
	id: { type: String },
	category: { type: String },
	product: { type: String },
	costPrice: { type: Number },
	amount: { type: Number },
	salePrice: { type: Number },
	image: { type: String },
});

const Products = models.Products || model('Products', ProductsSchema);

export default Products;
