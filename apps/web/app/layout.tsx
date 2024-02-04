import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../global.css'
import { RootProvider } from '../components/root-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Lucia Auth'
}

function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    )
}

export default RootLayout
