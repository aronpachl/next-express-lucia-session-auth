import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUser } from '../utils/get-user'

async function Page() {
    const user = await getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <main className={'h-full grid place-content-center'}>
            <h1 className="text-3xl font-bold text-red-400">Page</h1>
            <Link href={'/logout'} className={'underline text-xs'}>
                Logout
            </Link>
        </main>
    )
}

export default Page
