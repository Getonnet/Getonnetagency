'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const SERVICES_ITEMS = [
  { label: 'AI', href: '/services/ai' },
  { label: 'App development', href: '/services/app-development' },
  { label: 'Branding', href: '/services/branding' },
  { label: 'Digital advertising', href: '/services/digital-advertising' },
  { label: 'Web development', href: '/services/web-development' },
]

// ─── Services dropdown ─────────────────────────────────────────────────────────

function ServicesDropdown() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const servicesActive = pathname.startsWith('/services')

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`nav-link-btn${servicesActive ? ' active' : ''}`}
        aria-expanded={open}
      >
        Services
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            transition: 'transform 0.25s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Invisible bridge — fills the gap between button and panel so
          moving the mouse diagonally doesn't trigger onMouseLeave */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '100%',
          left: '-20px',
          right: '-20px',
          height: 16,
          display: open ? 'block' : 'none',
        }}
      />

      {/* Dropdown panel — paddingTop adds overlap with the bridge */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          left: '50%',
          transform: `translateX(-50%) translateY(${open ? 0 : -8}px)`,
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          zIndex: 10,
          paddingTop: 4,
        }}
      >
        <div
          style={{
            backgroundColor: '#f0efed',
            borderRadius: 12,
            boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            minWidth: 220,
            padding: 16,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#aaa',
              marginBottom: 8,
            }}
          >
            Services
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SERVICES_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="dropdown-item"
                style={{
                  fontFamily: 'var(--font-figtree), system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 16,
                  color: 'rgb(35,35,35)',
                }}
              >
                <span className={`dropdown-link${isActive(item.href) ? ' active' : ''}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile services accordion ────────────────────────────────────────────────

function MobileServices({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '16px 0',
          fontFamily: 'var(--font-figtree), system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          color: 'rgb(35,35,35)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Services
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? 320 : 0,
          transition: 'max-height 0.25s ease',
        }}
      >
        <div style={{ paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SERVICES_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'block',
                padding: '10px 16px',
                fontFamily: 'var(--font-figtree), system-ui, sans-serif',
                fontWeight: 500,
                fontSize: 15,
                color: '#555',
                textDecoration: 'none',
                borderRadius: 8,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Logo ──────────────────────────────────────────────────────────────────────

function Logo() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <span
        style={{
          fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 12,
          color: 'rgb(35,35,35)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        G E T O N N E T
      </span>
    )
  }

  return (
    <Image
      src="/media/getonnet-logo-dark.svg"
      alt="GetOnNet"
      width={200}
      height={44}
      priority
      style={{ objectFit: 'contain', height: 'auto' }}
      onError={() => setImgError(true)}
    />
  )
}

// ─── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function navClass(href: string) {
    const isActive = pathname === href || pathname.startsWith(href + '/')
    return `nav-link${isActive ? ' active' : ''}`
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? '#F1F0EE'
            : 'linear-gradient(to bottom, #F1F0EE 0%, transparent 100%)',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-20 w-full"
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Link>

          {/* Centre nav — desktop */}
          <nav className="hidden md:flex items-center gap-9">
            <Link href="/projects" className={navClass('/projects')}>
              Projects
            </Link>

            <ServicesDropdown />

            <Link href="/about" className={navClass('/about')}>
              About us
            </Link>

            <Link href="/support" className={navClass('/support')}>
              Support
            </Link>
          </nav>

          {/* Right CTA — desktop only */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-figtree), system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: '#fff',
                backgroundColor: '#fb6962',
                textDecoration: 'none',
                borderRadius: 9999,
                padding: '10px 20px',
                transition: 'background-color 0.18s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#e85550'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#fb6962'
              }}
            >
              Get a quote ✨
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              style={{
                display: 'block',
                height: 2,
                width: 20,
                borderRadius: 9999,
                backgroundColor: 'rgb(35,35,35)',
                transition: 'transform 0.22s ease',
                transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                height: 2,
                width: 20,
                borderRadius: 9999,
                backgroundColor: 'rgb(35,35,35)',
                transition: 'opacity 0.22s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                height: 2,
                width: 20,
                borderRadius: 9999,
                backgroundColor: 'rgb(35,35,35)',
                transition: 'transform 0.22s ease',
                transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        style={{
          backgroundColor: 'rgba(0,0,0,0.35)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          opacity: mobileOpen ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* ── Mobile slide-in panel ──────────────────────────────────────────── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{
          width: 300,
          backgroundColor: '#f5f3f0',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.14)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
        aria-hidden={!mobileOpen}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: 80, borderBottom: '1px solid rgba(0,0,0,0.07)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 12,
              color: 'rgb(35,35,35)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            G E T O N N E T
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="rgb(35,35,35)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-grow overflow-y-auto px-6 py-5">
          <Link
            href="/projects"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '16px 0',
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              color: 'rgb(35,35,35)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            Projects
          </Link>

          <MobileServices onClose={() => setMobileOpen(false)} />

          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '16px 0',
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              color: 'rgb(35,35,35)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            About us
          </Link>

          <Link
            href="/support"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '16px 0',
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              color: 'rgb(35,35,35)',
              textDecoration: 'none',
            }}
          >
            Support
          </Link>
        </nav>

        {/* CTA */}
        <div className="px-6 pb-8 pt-2 flex-shrink-0">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%',
              padding: '12px 20px',
              fontFamily: 'var(--font-figtree), system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              color: '#fff',
              backgroundColor: '#fb6962',
              textDecoration: 'none',
              borderRadius: 9999,
            }}
          >
            Get a quote ✨
          </Link>
        </div>
      </div>
    </>
  )
}
