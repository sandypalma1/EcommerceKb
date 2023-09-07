import { MainLayout, AuthLayout } from '../../components/layouts';
import { Login } from '../../components/auth';

export default function LoginPage() {
	return (
		<MainLayout>
			<AuthLayout title={'Iniciar sesión'}>
				<Login />
			</AuthLayout>
		</MainLayout>
	);
}
