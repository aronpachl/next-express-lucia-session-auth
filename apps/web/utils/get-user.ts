import { cookies } from 'next/headers'

export const getUser = async () => {
    const authSession = cookies().get('auth_session')
    const response = await fetch('http://localhost:8080/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `${authSession?.name}=${authSession?.value}`
        }
    })
    if (response.status !== 200) {
        return null
    }

    const data = await response.json()
    return data as { username: string; userId: string } | null
}
