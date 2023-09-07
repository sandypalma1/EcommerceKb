import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
	isConnected: 0,
};

const MONGODB_URI = process.env.MONGODB_URI;

export const connect = async () => {
	if (mongoConnection.isConnected) return;

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;

		if (mongoConnection.isConnected === 1) return;

		await mongoose.disconnect();
	}

	await mongoose.connect(MONGODB_URI || '');
	mongoConnection.isConnected = 1;
	console.log('Conectado a MongoDB:', MONGODB_URI);
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;

	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;

	console.log('Desconectado de MongoDB');
};
