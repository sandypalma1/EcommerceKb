import { Schema, model, models } from 'mongoose';

const DirectionsSchema = new Schema({
	idUser: { type: String, required: true },
	fullName: { type: String, required: true },
	cedula: { type: String, required: true },
	email: { type: String, required: true },
	direccion: { type: String, required: true },
	referencia: { type: String, required: true },
	provincia: { type: String, required: true },
	ciudad: { type: String, required: true },
	codPostal: { type: String, required: true },
	telefono: { type: String, required: true },
});

const Directions = models.Directions || model('Directions', DirectionsSchema);

export default Directions;
