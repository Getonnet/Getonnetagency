import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import React from 'react'

import './globals.css'
import './styles.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata = {
  description:
    'Full-service digital agency working at the intersection of people and digital technologies.',
  title: 'GetOnNet – A development company that delivers results',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="nb" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
