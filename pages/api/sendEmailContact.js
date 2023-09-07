import nodemailer from 'nodemailer';
export default async function handler(req, res) {
	try {
		const { email, asunto, message } = req.body;

		const messageData = {
			from: process.env.NODE_EMAIL,
			to: email,
			subject: asunto,
			text: message,
			html: `<p>${message}</p>`,
		};

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.NODE_EMAIL,
				pass: process.env.NODE_PASSWORD,
			},
		});

		transporter.sendMail(messageData, (error, info) => {
			if (error) {
				console.log('Error enviando email');
				console.log(error.message);
			} else {
				console.log('Email enviado');
			}
		});

		return res.status(200).json({
			message: {
				value: `Email enviado correctamente.`,
				color: 'success',
			},
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: {
				value: 'Ocurrió un problema al enviar el email.',
				color: 'error',
			},
		});
	}
}
