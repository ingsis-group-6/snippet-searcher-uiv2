import './globals.css'
import {Inter} from 'next/font/google'
import {ReactNode} from 'react'
import {GlobalContext} from './globalContext'
import {UserProvider} from "@auth0/nextjs-auth0/client";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <GlobalContext>
        <UserProvider>
          {children}
        </UserProvider>
    </GlobalContext>
    </body>
    </html>
  )
}