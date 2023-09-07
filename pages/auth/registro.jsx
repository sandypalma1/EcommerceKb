import { MainLayout, AuthLayout } from '../../components/layouts';
import { Register } from '../../components/auth';

export default function RegisterPage() {
	return (
		<MainLayout>
			<AuthLayout title={'Regístrate'}>
				<Register />
			</AuthLayout>
		</MainLayout>
	);
}
