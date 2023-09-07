import { Schema, model, models } from 'mongoose';

const UsersSchema = new Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const Users = models.Users || model('Users', UsersSchema);

export default Users;
