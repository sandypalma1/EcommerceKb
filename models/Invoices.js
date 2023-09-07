import { Schema, model, models } from 'mongoose';

const InvoicesSchema = new Schema(
	{
		idUser: { type: String },
		direccion: {
			fullName: { type: String },
			direccions: { type: String },
			cedula: { type: String },
			email: { type: String },
			telefono: { type: String },
			provincia: { type: String },
			ciudad: { type: String },
			codPostal: { type: String },
		},
		numFactura: { type: String },
		products: { type: Array },
		valorTotal: { type: Number },
	},
	{ timestamps: true }
);

const Invoices = models.Invoices || model('Invoices', InvoicesSchema);

export default Invoices;
