import Link from 'next/link'

import './cta-section.css'

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-box">
          <div className="cta-inner">
            <div className="cta-subtitle">
              <span className="cta-dot" aria-hidden="true" />
              <span className="cta-subtitle__text">Vi tar nå imot nye prosjekter!</span>
            </div>
            <h2 className="cta-heading">La oss skape noe fantastisk sammen!</h2>
            <p className="cta-body">
              Bestill et møte med oss og oppdag hvordan våre digitale løsninger kan løfte virksomheten din. Vi er klare til å hjelpe deg med å nå dine mål.
            </p>
            <Link href="/kontakt" className="cta-btn">Kontakt</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
