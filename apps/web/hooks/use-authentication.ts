import { useMutation, UseMutationResult } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

type AuthenticationPayload = {
    username: string
    password: string
}
type AuthenticationError = AxiosError<{ message: string }>
type AuthenticationMutationResult = UseMutationResult<unknown, AuthenticationError, AuthenticationPayload>

export function useAuthentication(type: 'login' | 'signup'): AuthenticationMutationResult {
    return useMutation<unknown, AxiosError<{ message: string }>, { username: string; password: string }>({
        mutationFn: (payload) =>
            axios.post(`http://localhost:8080/${type}`, payload, {
                withCredentials: true
            }),
        onError: (error) => {
            alert(error.response?.data?.message)
        }
    })
}
