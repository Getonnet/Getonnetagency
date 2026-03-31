import Image from 'next/image'
import Link from 'next/link'

// ─── Column data ───────────────────────────────────────────────────────────────

const SERVICES_LINKS = [
  { label: 'Web development', href: '/services/web-development' },
  { label: 'AI', href: '/services/ai' },
  { label: 'App development', href: '/services/app-development' },
  { label: 'Digital advertising', href: '/services/digital-advertising' },
  { label: 'UX/UI Design', href: '/services/ux-ui-design' },
  { label: 'Online stores', href: '/services/online-stores' },
  { label: 'Branding', href: '/services/branding' },
]

const CONTENT_LINKS = [
  { label: 'Customer cases', href: '/cases' },
  { label: 'Articles', href: '/articles' },
]

const COMPANY_LINKS = [
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Support', href: '/support' },
  { label: 'Privacy policy', href: '/privacy-policy' },
]

// ─── SVG icons ────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.05 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

// ─── Link column ──────────────────────────────────────────────────────────────

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-figtree), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 18,
          lineHeight: '26px',
          color: 'rgb(35,35,35)',
          marginBottom: 16,
        }}
      >
        {heading}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="footer-link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#E3E0DD' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '96px 24px',
          paddingBottom: 20,
        }}
      >
        {/* ── 4-column grid ─────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[35%_1fr_1fr_1fr] gap-12 lg:gap-8"
          style={{ marginBottom: 64 }}
        >

          {/* Col 1 — Logo + Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <Image
                src="/media/getonnet-logo-dark.svg"
                alt="GetOnNet"
                width={200}
                height={44}
                style={{ objectFit: 'contain', height: 'auto' }}
              />
            </Link>

            {/* Phone — mt-5 adds spacing between logo and contact */}
            <a href="tel:+4735901500" className="footer-contact-row mt-5">
              <span className="footer-contact-icon">
                <PhoneIcon />
              </span>
              <span className="footer-contact-text">(+47) 35 90 15 00</span>
            </a>

            {/* Email */}
            <a href="mailto:hello@getonnet.agency" className="footer-contact-row">
              <span className="footer-contact-icon">
                <EmailIcon />
              </span>
              <span className="footer-contact-text">hello@getonnet.agency</span>
            </a>
          </div>

          {/* Col 2 — Services */}
          <FooterCol heading="Services" links={SERVICES_LINKS} />

          {/* Col 3 — Content */}
          <FooterCol heading="Content" links={CONTENT_LINKS} />

          {/* Col 4 — GetOnNet */}
          <FooterCol heading="GetOnNet" links={COMPANY_LINKS} />
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 28 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '14px',
              color: 'rgb(35,35,35)',
              margin: 0,
            }}
          >
            © 2026 GetOnNet AS &mdash; Org nr 998 580 706
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/getonnet/', Icon: InstagramIcon },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/getonnet/', Icon: LinkedInIcon },
              { label: 'Facebook', href: 'https://www.facebook.com/getonnetab', Icon: FacebookIcon },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label={s.label}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
