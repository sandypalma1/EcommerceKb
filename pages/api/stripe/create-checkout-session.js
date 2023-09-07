// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from 'stripe';
import { db } from '../../../utils';
import Invoices from '../../../models/Invoices';

export default async function handler(req, res) {
	try {
		await db.connect();
		const invoice = await Invoices.find().sort({ $natural: -1 }).limit(1);

		const incremental =
			invoice.length === 0 ? 1001 : parseInt(invoice[0]?.numFactura.split('-')[2]) + 1;

		const numFactura = `001-003-${'0'.repeat(9 - incremental.toString().length)}${incremental}`;

		const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

		const session = await stripe.checkout.sessions.create({
			line_items: req.body?.itemsPago,
			mode: 'payment',
			success_url: `${process.env.NEXT_APP_URL}/carrito/compra-realizada?success=ok&numFactura=${numFactura}`,
			cancel_url: `${process.env.NEXT_APP_URL}/carrito`,
		});

		res.status(200).json({ url: session.url });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
