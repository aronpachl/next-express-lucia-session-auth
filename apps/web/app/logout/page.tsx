import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getUser } from '../../utils/get-user'
import { redirect } from 'next/navigation'

async function logout() {
    'use server'

    const authSession = cookies().get('auth_session')
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `${authSession?.name}=${authSession?.value}`
            }
        })

        if (response.status !== 200) {
            return null
        }

        revalidatePath('/')
        revalidatePath('/logout')
    } catch (e) {
        console.error(e)
    }
}

async function LogoutPage() {
    const user = await getUser()

    if (!user) {
        redirect('/login') // workaround, because redirect in action throws an error
    }

    return (
        <main className={'h-full grid place-content-center'}>
            <form action={logout}>
                <button type={'submit'} className={'bg-red-400 px-6 py-2 rounded-md text-white font-medium'}>
                    Logout
                </button>
            </form>
        </main>
    )
}

export default LogoutPage
