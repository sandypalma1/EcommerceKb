import { Schema, model, models } from 'mongoose';

const CategoriesSchema = new Schema({
	name: { type: String },
});

const Categories = models.Categories || model('Categories', CategoriesSchema);

export default Categories;
