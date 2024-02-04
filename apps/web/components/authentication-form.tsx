'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAuthentication } from '../hooks/use-authentication'

const AuthenticationSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8)
})

type AuthenticationFormType = z.infer<typeof AuthenticationSchema>

type Props = {
    type: 'login' | 'signup'
}

export function AuthenticationForm({ type }: Props) {
    const router = useRouter()
    const { mutate, isPending } = useAuthentication(type)
    const methods = useForm<AuthenticationFormType>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: zodResolver(AuthenticationSchema)
    })

    const onSubmit = (values: AuthenticationFormType) => {
        mutate(values, {
            onSuccess: () => {
                router.replace('/')
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <form className="mt-4" onSubmit={methods.handleSubmit(onSubmit)}>
                <Label htmlFor="username">Username</Label>
                <Input {...methods.register('username')} id="username" />
                <Label htmlFor="username">Password</Label>
                <Input {...methods.register('password')} type="password" />
                <br />
                <Button disabled={isPending} type="submit">
                    Submit
                </Button>
            </form>
        </FormProvider>
    )
}
