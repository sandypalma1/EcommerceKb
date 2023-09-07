import html_to_pdf from 'html-pdf-node';
import path from 'path';
import Invoices from '../../../models/Invoices';
import Directions from '../../../models/Directions';
import { db } from '../../../utils';
import moment from 'moment/moment';
import nodemailer from 'nodemailer';
import fs from 'fs';

export default async function handler(req, res) {
	try {
		const { cardProducts, carrito, user, numFactura } = req.body;
		const subtotal = (parseFloat(carrito?.total.toFixed(2)) / 1.12).toFixed(2);
		const iva = (parseFloat(subtotal) * 0.12).toFixed(2);

		if (!user) return;

		const dateAuthorization = moment().utc(true).format('DD/MM/YYYY HH:mm:ss');

		// Save invoices
		await db.connect();
		const direction = await Directions.findOne({ idUser: user?._id });

		const invoice = await Invoices.findOne({ numFactura });

		if (invoice) {
			return res.status(400).json({
				message: 'La factura ya existe',
			});
		}

		const newInvoice = new Invoices({
			idUser: user?._id,
			direccion: {
				fullName: direction?.fullName,
				direccions: direction?.direccion,
				cedula: direction?.cedula,
				email: direction?.email,
				telefono: direction?.telefono,
				provincia: direction?.provincia,
				ciudad: direction?.ciudad,
				codPostal: direction?.codPostal,
			},
			numFactura,
			products: cardProducts,
			valorTotal: carrito?.total,
		});

		await newInvoice.save({ validateBeforeSave: true });

		fs.mkdir(
			path.join(__dirname, `../../../../../public/facturas/`),
			{ recursive: true },
			(error, path) => {
				console.log(path);
				console.log(error);
			}
		);

		// Settings invoices
		let options = {
			format: 'A4',
			path: path.join(__dirname, `../../../../../public/facturas/${numFactura}.pdf`),
			args: ['chromium-browser --remote-debugging-port=9222', 'google-chrome --foo --bar=2'],
		};

		const bodys = cardProducts.map(
			({ id, product, cantCarrito, salePrice }) =>
				`<div class='table-body' key={id}>
			<div class='table-th'>${id}</div>
			<div class='table-th'>${product}</div>
			<div class='table-th'>Unidad</div>
			<div class='table-th'>${cantCarrito}</div>
			<div class='table-th'>$ ${(parseFloat(salePrice.toFixed(2)) / 1.12).toFixed(2)}</div>
			<div class='table-th'>$ ${(cantCarrito * (parseFloat(salePrice.toFixed(2)) / 1.12)).toFixed(
				2
			)}</div>
		</div>`
		);

		let file = {
			content: `
		        <html>
		            <head>
		                <meta charset="utf-8">
		                <title>FACTURA</title>
		                <link rel="stylesheet" type="text/css" href="${
							process.env.NEXT_APP_URL
						}/css/style.css" />
		            </head>

					<body>
					<header class="header-container">
						<div class="container-left">
							<div class="container-logo">
								<img
									class="img-logo"
									src="${process.env.NEXT_APP_URL}/logo-vertical-color.png"
									alt="Logo de The King Of Beer" />
							</div>

							<div class="container-info">
								<p>THE KING OF BEER</p>
								<p>Quijije Espinal Jhosselyn Lilibeth</p>
								<p>Dirección Matriz: Calle principal Bajo de la Palma, calle secundaria 6 de marzo</p>
								<p>Teléfono: 0992100647</p>
								<p>Correos: thekingofbeer15@gmail.com</p>
								<p>Contribuyente Régimen RIMPE</p>
							</div>
						</div>

						<div class="container-rigth">
							<div class="container-info-factura">
								<div class="container-rigth-content-item">
									<p>RUC: </p>
									<p>1315479913001</p>
								</div>

								<div class="container-rigth-content-item">
									<p>Factura: </p>
									<p>${numFactura}</p>
								</div>

								<div class="container-rigth-content-item">
									<p>Fecha Autorización: </p>
									<p>${dateAuthorization}</p>
								</div>

								<div class="container-rigth-content-item">
									<p>Emisión: </p>
									<p>Normal</p>
								</div>
							</div>
						</div>
					</header>

					<section class="section-data-client">
						<div class="container-data-client">
							<div class="container-data-client-item">
								<p>Cédula / RUC:</p>
								<p class="text-padd">${direction.cedula}</p>
							</div>

							<div class="container-data-client-item">
								<p>Nombre:</p>
								<p class="text-padd">${direction.fullName}</p>
							</div>

							<div class="container-data-client-item">
								<p>Dirección:</p>
								<p class="text-padd">${direction.direccion}</p>
							</div>

							<div class="container-data-client-content-item">
								<div class="container-data-client-item">
									<p>Fecha Emision:</p>
									<p class="text-padd">${dateAuthorization}</p>
								</div>
								<div class="container-data-client-item">
									<p>Email:</p>
									<p class="text-padd">${direction.email}</p>
								</div>
								<div class="container-data-client-item">
									<p>Teléfono:</p>
									<p class="text-padd">${direction?.telefono}</p>
								</div>
							</div>
						</div>
					</section>

				<section class="section-table-compra">
					<main class="table-container">
						<div class="table-header">
							<div class="table-th">Código</div>
							<div class="table-th">Descripción</div>
							<div class="table-th">Med.</div>
							<div class="table-th">Cantidad</div>
							<div class="table-th">Precio Unitario</div>
							<div class="table-th">Total</div>
						</div>

						<div class="table-body-container">
							${bodys.join('\n')}
						</div>

						<div class="table-footer-container">
							<div class="table-footer">
								<div class="table-th">Subtotal: </div>
								<div class="table-th">$ ${subtotal}</div>
							</div>
							<div class="table-footer">
								<div class="table-th">IVA:</div>
								<div class="table-th">$ ${iva}</div>
							</div>
							<div class="table-footer">
								<div class="table-th">Valor total:</div>
								<div class="table-th">$ ${carrito?.total.toFixed(2)}</div>
							</div>
						</div>
					</main>
				</section>
				</body>
		        </html>
		    `,
		};

		html_to_pdf
			.generatePdf(file, options)
			.then((pdfBuffer) => {
				console.log('Factura creada', pdfBuffer);

				const messageData = {
					from: process.env.NODE_EMAIL,
					to: direction?.email,
					subject: 'Ha recibido una Factura nueva!',
					text: `Estimado(a), ${direction?.fullName?.toUpperCase()}.\n\nSu Factura No. ${numFactura} ha sido generado con éxito y se encuentra disponible para su descarga y visualización.`,
					attachments: [
						{
							filename: `${numFactura}.pdf`,
							path: path.join(
								__dirname,
								`../../../../../public/facturas/${numFactura}.pdf`
							),
							contentType: 'application/pdf',
						},
					],
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
			})
			.catch((error) => console.log(`Error here:`, error));

		res.status(200).json({ message: 'Factura creada', numFactura, isDownload: false });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error });
	}
}
