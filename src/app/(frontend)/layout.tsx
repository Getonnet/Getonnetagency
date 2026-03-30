import { Figtree } from 'next/font/google'
import React from 'react'

import './globals.css'
import './styles.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nb" className={figtree.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
