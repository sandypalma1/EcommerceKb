import bcrypt from 'bcrypt';

import Users from '../models/User';
import { db } from '../utils';

export const checkUserEmailPassword = async (email, password) => {
	await db.connect();

	const user = await Users.findOne({ email });

	await db.disconnect();

	if (!user) {
		return null;
	}

	if (!bcrypt.compareSync(password, user.password)) {
		return null;
	}

	const { name, lastName, _id } = user;

	return {
		_id,
		email: email.toLocaleLowerCase(),
		name,
		lastName,
	};
};
