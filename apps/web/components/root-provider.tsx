'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/query-client'

export function RootProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
