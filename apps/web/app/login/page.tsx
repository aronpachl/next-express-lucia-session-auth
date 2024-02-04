import Link from 'next/link'
import { AuthenticationForm } from '../../components/authentication-form'

function LoginPage() {
    return (
        <main className="h-full grid place-content-center">
            <h1 className="font-medium text-lg">Login here</h1>
            <Link href={'/signup'} className={'text-sm underline'}>
                or sign up
            </Link>
            <AuthenticationForm type={'login'} />
        </main>
    )
}

export default LoginPage
