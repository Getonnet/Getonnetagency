import type { Metadata } from 'next'

import HeroSection from '@/components/HeroSection'
import SupportForm from './SupportForm'
import './support.css'

export const metadata: Metadata = {
  title: 'Support – GetOnNet Agency',
  description: 'Trenger du support? Vi er her for å hjelpe deg med din henvendelse.',
}

export default function SupportPage() {
  return (
    <div className="support-page">
      <HeroSection
        subtitle="Support"
        title="Trenger du support?"
        image={{ src: '/api/media/file/kontakta-oss-getonnet-1.jpg', alt: 'Support hero', width: 1280, height: 600 }}
      />
      <div className="support-page__container">
        <div className="support-page__content">
          <aside className="support-page__left">
            <h2>Vi er her for å hjelpe!</h2>
            <p>
              Vårt team er her for å svare på din henvendelse, enten om du har trøbbel med
              nettsiden din, trenger hjelp med videreutvikling eller om du har noen generelle
              spørsmål.
            </p>
            <p>
              Fyll gjerne ut skjemaet til høyre, så vil vi kontakte deg så fort som mulig. Du vil
              høre fra oss innen et døgn.
            </p>
            <p>Du kan også nå oss på e-postene nedenfor eller ringe oss.</p>

            <div className="support-page__links support-page__icon-links">
              <a href="tel:35901500" className="support-page__link">
                <span className="support-page__link-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="support-page__link-text">35 90 15 00</span>
              </a>
              <a href="mailto:kundeservice@getonnet.no" className="support-page__link">
                <span className="support-page__link-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="support-page__link-text">kundeservice@getonnet.no</span>
              </a>
            </div>

            <div className="support-page__section">
              <h3>Faktura og support</h3>
              <ul className="support-page__list">
                <li><a href="mailto:faktura@getonnet.no" className="support-page__list-link">faktura@getonnet.no</a></li>
                <li><a href="mailto:kundeservice@getonnet.no" className="support-page__list-link">kundeservice@getonnet.no</a></li>
                <li><a href="/priser" className="support-page__list-link">Driftsavtalepriser</a></li>
                <li><a href="/priser" className="support-page__list-link">Telefontid er 08:00–16:00 på hverdager</a></li>
              </ul>
            </div>

            <div className="support-page__section">
              <h3>Status for våre servere</h3>
              <ul className="support-page__list">
                <li>
                  <a
                    href="https://status.gethosted.no/"
                    className="support-page__list-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="support-page__right">
            <SupportForm />
          </div>
        </div>
      </div>
    </div>
  )
}
