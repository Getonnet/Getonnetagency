import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Våre kundecaser – GetOnNet Agency',
  description:
    'Se et utvalg av noen prosjekter vi har levert. Vil du vite mer om hvordan vi jobber? Kontakt oss, så forteller vi deg hvordan!',
}

export default function KundecaserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
