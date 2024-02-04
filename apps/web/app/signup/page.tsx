import Link from 'next/link'
import { AuthenticationForm } from '../../components/authentication-form'

function SignUpPage() {
    return (
        <main className={'h-full grid place-content-center'}>
            <h1 className="font-medium text-lg">Register here</h1>
            <Link href={'/login'} className={'text-sm underline'}>
                or login
            </Link>
            <AuthenticationForm type={'signup'} />
        </main>
    )
}

export default SignUpPage
