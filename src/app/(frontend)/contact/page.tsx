import type { Metadata } from 'next'
import Image from 'next/image'

import ContactForm from './ContactForm'
import './contact.css'

export const metadata: Metadata = {
  title: 'Ta kontakt – GetOnNet Agency',
  description:
    'Har du noe spennende på gang? Vi elsker utfordringer og hårete mål – ta kontakt med oss i dag.',
}

const TEAM = [
  { src: '/images/team/Gjermundx2.png', alt: 'Team member 1' },
  { src: '/images/team/Torsteinx2.png', alt: 'Team member 2' },
  { src: '/images/team/Andreax2.png', alt: 'Team member 3' },
  { src: '/images/team/Torx2.png', alt: 'Team member 4' },
  { src: '/images/team/Stianx2.png', alt: 'Team member 5' },
  { src: '/images/team/Simonx2.png', alt: 'Team member 6' },
]

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__content">
          <aside className="contact-page__left">
            <div className="contact-page__avatars">
              {TEAM.map((member, i) => (
                <div key={i} className="contact-page__avatar">
                  <Image src={member.src} alt={member.alt} width={48} height={48} />
                </div>
              ))}
            </div>

            <h1>Skal vi ta en prat?</h1>
            <p>
              Har du noe spennende på gang? Vi elsker utfordringer og hårete mål – la oss ta en
              uforpliktende prat for å finne ut om vi kan hjelpe.
            </p>

            <div className="contact-page__links">
              <a href="mailto:hei@getonnet.no" className="contact-page__link">
                <span className="contact-page__link-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="contact-page__link-text">hei@getonnet.no</span>
              </a>
              <a href="tel:35901500" className="contact-page__link">
                <span className="contact-page__link-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="contact-page__link-text">35 90 15 00</span>
              </a>
            </div>
          </aside>

          <div className="contact-page__right">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
