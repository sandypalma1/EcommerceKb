import { CheckCircle, PictureAsPdf } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { Loading } from '../Loading';

export const CarritoCompraRealizada = ({ openLoader, numFactura, pdfDisable }) => {
	return (
		<>
			{openLoader ? (
				<Loading />
			) : (
				<Grid
					container
					justifyContent='center'
					alignItems='center'
					sx={{ padding: '50px' }}>
					<Grid item sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
						<Box>
							<Typography
								textAlign='center'
								sx={{
									color: '#575757',
									fontWeight: '700',
									fontSize: { xs: '30px', md: '60px' },
								}}>
								Compra realizada exitosamente
							</Typography>

							<Stack flexDirection='row' justifyContent='center' alignItems='center'>
								<CheckCircle
									color='success'
									sx={{ fontSize: { xs: '80px', md: '150px' } }}
								/>
							</Stack>
						</Box>

						<Box>
							<Typography
								textAlign='center'
								sx={{
									color: '#575757',
									fontWeight: '700',
									fontSize: { xs: '30px', md: '50px' },
								}}>
								¡Gracias por su compra!
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Button
								disabled={pdfDisable}
								variant='contained'
								color='error'
								endIcon={<PictureAsPdf />}>
								<Link href={`/facturas/${numFactura}.pdf`} download target='_blank'>
									Descargar factura
								</Link>
							</Button>
						</Box>
					</Grid>
				</Grid>
			)}
		</>
	);
};
