import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import type { Case, Media, Testimonial } from '@/payload-types'
import ContactForm from './ContactForm'
import './styles.css'

// ─── helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(f: unknown): string | null {
  if (!f || typeof f !== 'object') return null
  const m = f as Media
  const raw = m.url

  if (raw) {
    // Already a usable absolute path or external URL — return as-is
    if (raw.startsWith('/') || raw.startsWith('http')) return raw
    // Bare filename stored without path prefix
    return `/media/${raw}`
  }

  // url field absent — fall back to filename
  if (m.filename) return `/media/${m.filename}`
  return null
}
function mediaAlt(f: unknown): string {
  if (!f || typeof f !== 'object') return ''
  return (f as Media).alt ?? ''
}

const CAT_PALETTES = [
  { bg: '#dbeafe', text: '#1d4ed8' },
  { bg: '#ede9fe', text: '#6d28d9' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#dcfce7', text: '#15803d' },
  { bg: '#ffe4e6', text: '#be123c' },
  { bg: '#cffafe', text: '#0e7490' },
  { bg: '#fce7f3', text: '#9d174d' },
]
function catPalette(name: string) {
  const i = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % CAT_PALETTES.length
  return CAT_PALETTES[i]!
}

// ─── static data ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: '💻',
    bg: '#1a2744',
    title: 'Web development',
    desc: 'We build robust, user-friendly and fast websites that drive your business forward.',
  },
  {
    icon: '📱',
    bg: '#1f1a44',
    title: 'App development',
    desc: 'Native and cross-platform mobile apps engineered for seamless iOS and Android experiences.',
  },
  {
    icon: '🤖',
    bg: '#1a2f1a',
    title: 'AI solutions',
    desc: 'Smart automation, chatbots, and AI-powered features woven into your digital products.',
  },
  {
    icon: '📣',
    bg: '#2f1a1a',
    title: 'Digital advertising',
    desc: 'Data-driven campaigns across Google and Meta — reaching the right audience at the right moment.',
  },
]

const CLIENTS = ['Yokis', 'ABC', 'Norsk Tipping', 'Scholmed', 'Mill', 'Nel', 'DCTY', 'Getonnet', 'E24']

const TECH = [
  { name: 'Next.js', cat: 'React framework' },
  { name: 'WordPress', cat: 'CMS' },
  { name: 'Webflow', cat: 'No-code' },
  { name: 'Shopify', cat: 'E-commerce' },
  { name: 'HubSpot', cat: 'CRM' },
  { name: 'Elementor', cat: 'Page builder' },
  { name: 'Sitevision', cat: 'Enterprise CMS' },
  { name: 'Payload CMS', cat: 'Headless CMS' },
]

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const payload = await getPayload({ config: await configPromise })

  const [casesRes, testimonialsRes] = await Promise.all([
    payload.find({ collection: 'cases', limit: 6, depth: 1, overrideAccess: true }),
    payload.find({ collection: 'testimonials', limit: 6, depth: 1, overrideAccess: true }),
  ])

  const cases = casesRes.docs as Case[]
  const testimonials = testimonialsRes.docs as Testimonial[]

  return (
    <div style={{ backgroundColor: '#E3E0DD', color: '#161616' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollUp { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes scrollDown { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .col-up-1 { animation: scrollUp 25s linear infinite; will-change: transform; }
        .col-down-2 { animation: scrollDown 35s linear infinite; will-change: transform; }
        .col-up-3 { animation: scrollUp 40s linear infinite; will-change: transform; }
      `}} />
      <section
        style={{
          backgroundColor: '#F1F0EE',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* SVG background pattern — very subtle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage: 'url(/media/frame-22000008559.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />

        {/* Left content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '45%',
            paddingTop: 140,
            paddingBottom: 80,
            paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
          }}
          className="hidden md:block"
        >
          <h1
            style={{
              fontFamily: 'var(--font-figtree), sans-serif',
              fontWeight: 700,
              fontSize: 68,
              lineHeight: '80px',
              color: 'rgb(35,35,35)',
              margin: '0 0 20px',
            }}
          >
            We develop and design digital products
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-figtree), sans-serif',
              fontWeight: 400,
              fontSize: 20,
              lineHeight: '29px',
              color: 'rgb(35,35,35)',
              margin: '0 0 32px',
              maxWidth: 480,
            }}
          >
            Full-service digital agency working at the intersection of people and digital
            technologies.
          </p>

          <Link
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              borderRadius: 9999,
              backgroundColor: '#fb6962',
              color: '#fff',
              fontFamily: 'var(--font-figtree), sans-serif',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Get a quote ✨
          </Link>

          {/* Google review badge — plain, no pill wrapper */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none"><g clipPath="url(#clip0_2296_6298)"><path d="M39.611 16.083H38V16H20V24H31.303C29.654 28.657 25.223 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C23.059 8 25.842 9.154 27.961 11.039L33.618 5.382C30.046 2.053 25.268 0 20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 18.659 39.862 17.35 39.611 16.083Z" fill="#161616"></path></g><defs><clipPath id="clip0_2296_6298"><rect width="40" height="40" fill="white"></rect></clipPath></defs></svg>
              <span
                style={{
                  fontFamily: 'var(--font-figtree), sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'rgb(35,35,35)',
                }}
              >
                5,0 Google reviews
              </span>
            </div>
            <div style={{ color: '#FFA500', fontSize: 16, marginTop: 4, letterSpacing: 2 }}>★★★★★</div>
          </div>
        </div>

        {/* Mobile left content */}
        <div className="md:hidden" style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: 96, paddingBottom: 32 }}>
          <div style={{ padding: '0 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 40,
                lineHeight: '48px',
                color: 'rgb(35,35,35)',
                margin: '0 0 16px',
              }}
            >
              We develop and design digital products
            </h1>

            <p
              style={{
                fontWeight: 400,
                fontSize: 18,
                lineHeight: '27px',
                color: 'rgb(35,35,35)',
                margin: '0 0 24px',
              }}
            >
              Full-service digital agency working at the intersection of people and digital
              technologies.
            </p>

            <Link
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: 9999,
                backgroundColor: '#fb6962',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Get a quote ✨
            </Link>

            {/* Google review badge — mobile */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40" fill="none"><g clipPath="url(#clip0_mob)"><path d="M39.611 16.083H38V16H20V24H31.303C29.654 28.657 25.223 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C23.059 8 25.842 9.154 27.961 11.039L33.618 5.382C30.046 2.053 25.268 0 20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 18.659 39.862 17.35 39.611 16.083Z" fill="#161616"></path></g><defs><clipPath id="clip0_mob"><rect width="40" height="40" fill="white"></rect></clipPath></defs></svg>
                <span style={{ fontWeight: 400, fontSize: 13, color: 'rgb(35,35,35)' }}>
                  5,0 Google reviews
                </span>
              </div>
              <div style={{ color: '#FFA500', fontSize: 14, marginTop: 4, letterSpacing: 2 }}>★★★★★</div>
            </div>
          </div>

          {/* Mobile marquee image rows */}
          <div style={{ marginTop: 24, width: '100vw', marginLeft: -24, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Row 1 — slides left */}
            <div className="marquee-left" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
              {[...cases.filter((c) => c.featuredImage && typeof c.featuredImage === 'object'), ...cases.filter((c) => c.featuredImage && typeof c.featuredImage === 'object')].map((c, i) => {
                const img = mediaUrl(c.featuredImage)!
                return (
                  <div
                    key={`ml-${c.id}-${i}`}
                    style={{
                      position: 'relative',
                      width: 160,
                      height: 110,
                      flexShrink: 0,
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={img}
                      alt={mediaAlt(c.featuredImage) || c.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="160px"
                    />
                  </div>
                )
              })}
            </div>
            {/* Row 2 — slides right */}
            <div className="marquee-right" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
              {[...cases.filter((c) => c.featuredImage && typeof c.featuredImage === 'object'), ...cases.filter((c) => c.featuredImage && typeof c.featuredImage === 'object')].map((c, i) => {
                const img = mediaUrl(c.featuredImage)!
                return (
                  <div
                    key={`mr-${c.id}-${i}`}
                    style={{
                      position: 'relative',
                      width: 160,
                      height: 110,
                      flexShrink: 0,
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={img}
                      alt={mediaAlt(c.featuredImage) || c.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="160px"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right — 3 column scrolling mosaic, absolute to right edge, full height */}
        <div
          className="hidden md:flex"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '40vw',
            overflow: 'hidden',
            gap: 20,
          }}
        >
          {[0, 1, 2].map((colIdx) => {
            const colClasses = ['col-up-1', 'col-down-2', 'col-up-3']
            const colImages = cases
              .filter((c) => c.featuredImage && typeof c.featuredImage === 'object')
              .filter((_, i) => i % 3 === colIdx)
            const doubled = [...colImages, ...colImages]
            return (
              <div
                key={colIdx}
                className={colClasses[colIdx]}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                {doubled.map((c, i) => {
                  const img = mediaUrl(c.featuredImage)!
                  return (
                    <div
                      key={`${c.id}-${i}`}
                      className="mosaic-img-wrapper"
                      style={{
                        position: 'relative',
                        height: 250,
                        width: '100%',
                        borderRadius: 16,
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={img}
                        alt={mediaAlt(c.featuredImage) || c.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="15vw"
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Hero bottom fade to #F1F0EE */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #F1F0EE)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />
      </section>

      {/* ── Client logos ──────────────────────────────────────────────────── */}
      {(() => {
        const LOGOS = [
          '/media/lp-logo-01.svg',
          '/media/lp-logo-11.svg',
          '/media/lp-logo-09.svg',
          '/media/lp-logo-08.svg',
          '/media/lp-logo-07.svg',
          '/media/lp-logo-06.svg',
          '/media/lp-logo-04-1.svg',
          '/media/lp-logo-03.svg',
          '/media/lp-logo-02.svg',
          '/media/lp-logo-10.svg',
          '/media/lp-logo-avia.svg',
        ]
        return (
          <section style={{ backgroundColor: '#F1F0EE', overflow: 'hidden', position: 'relative' }} className="lg:py-20 py-10">
            {/* full-width fade mask wrapper */}
            <div className="logo-marquee-wrapper">
              {/* inner max-width constrains nothing — track is max-content, mask is on wrapper */}
              <div
                className="logo-marquee-track"
                style={{ display: 'flex', gap: 80, width: 'max-content' }}
              >
                {[...LOGOS, ...LOGOS].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="logo-marquee-item"
                    style={{ height: 48, width: 'auto', flexShrink: 0 }}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── About / Scandinavian design ───────────────────────────────────── */}
      <section id="about" style={{ backgroundColor: '#F1F0EE', padding: '96px 0' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-figtree), sans-serif',
                fontWeight: 600,
                fontSize: 48,
                lineHeight: '56px',
                color: 'rgb(35,35,35)',
                margin: 0,
              }}>
                Scandinavian design.<br />Global results.
              </h2>

              <p style={{
                fontFamily: 'var(--font-figtree), sans-serif',
                fontWeight: 400,
                fontSize: 18,
                lineHeight: '28px',
                color: 'rgb(35,35,35)',
                marginTop: 24,
                maxWidth: 500,
              }}>
                We&apos;re an interdisciplinary team that loves ambitious goals and new challenges. At GetOnNet you&apos;ll find problem solvers, wordsmiths, illustrators, experience architects and code breakers. Our expertise lies in digital products, AI, web, app and digital marketing.
              </p>

              {/* Checklist */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Multidisciplinary expertise',
                  '15+ years of experience',
                  '500+ projects',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderRadius: 100,
                    backgroundImage: 'linear-gradient(90deg, #E3E0DD 0%, #E3E0DD00 100%)',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><g clipPath="url(#clip0_83_11)"><path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#161616"></path><path d="M18 8L9.75 16.25L6 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_83_11"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                    <span style={{
                      fontFamily: 'var(--font-figtree), sans-serif',
                      fontWeight: 600,
                      fontSize: 18,
                      lineHeight: '28px',
                      color: 'rgb(35,35,35)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 32px',
                  borderRadius: 9999,
                  backgroundColor: '#fb6962',
                  color: '#fff',
                  fontFamily: 'var(--font-figtree), sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  textDecoration: 'none',
                  marginTop: 32,
                  transition: 'opacity 0.2s',
                }}
              >
                Let&apos;s talk ☕
              </Link>
            </div>

            {/* Right — image + phone mockup + 3 pill marquee rows */}
            {(() => {
              const pillStyle: React.CSSProperties = {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 18px',
                margin: '10px',
                borderRadius: 100,
                backgroundColor: '#f4f4f480',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-figtree), sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgb(35,35,35)',
                width: 180,
                flexShrink: 0,
                flexGrow: 0,
                textAlign: 'center',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap' as const,
              }
              const rows = [
                { pills: ['Screen-adapted','On brand','SSL included','User funnels','Performance'], cls: 'marquee-left-18', top: '37%' },
                { pills: ['Integration','SEO optimization','Customization','Conversion','No hidden fees'], cls: 'marquee-left-25', top: '50%' },
                { pills: ['Mutual trust','UI/UX','Mobile first','Fast delivery','Transparent'], cls: 'marquee-left-20', top: '63%' },
              ]
              return (
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '1/1' }}>
                  {/* Background image */}
                  <Image
                    src="/media/bg-lp-00001.jpg"
                    alt=""
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* 3 pill marquee rows */}
                  {rows.map(({ pills, cls, top }) => (
                    <div key={top} style={{ position: 'absolute', top, left: 0, right: 0, zIndex: 5, overflow: 'hidden', transform: 'translateY(-50%)' }}>
                      <div className={cls} style={{ display: 'flex', gap: 20, width: 'max-content' }}>
                        {[...pills, ...pills].map((label, i) => (
                          <span key={i} style={pillStyle}>{label}</span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Phone mockup — centered, above marquees */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <div style={{ position: 'relative', width: '55%', aspectRatio: '1/1' }}>
                      <Image
                        src="/media/iPhone-13-Pro-Mockup-Vol-03-2048x2048-1.webp"
                        alt="Phone mockup"
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="30vw"
                      />
                    </div>
                  </div>
                </div>
              )
            })()}

          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section id="services" style={{ backgroundColor: '#0d0d0d', padding: '96px 0' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#555' }}
            >
              Services
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              Solutions made for modern businesses
            </h2>
          </div>

          {/* Cards — 2-col on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 flex flex-col gap-4 border hover:scale-[1.02] transition-transform cursor-default"
                style={{
                  backgroundColor: s.bg,
                  borderColor: 'rgba(255,255,255,0.07)',
                  minHeight: 220,
                }}
              >
                <div className="text-3xl">{s.icon}</div>
                <h3
                  className="text-base font-bold text-white"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: '#aaa' }}>
                  {s.desc}
                </p>
                <span className="text-sm font-semibold text-white mt-auto">Learn more →</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Cases grid ────────────────────────────────────────────────────── */}
      <section id="cases" className="max-w-[1280px] mx-auto px-6" style={{ padding: '96px 0' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#999' }}
            >
              Case studies
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold"
              style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
            >
              Experience from 500+{' '}
              <span style={{ color: '#999' }}>customer projects</span>
            </h2>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-black/60 hover:bg-black hover:text-white transition-colors whitespace-nowrap self-start sm:self-auto"
            style={{ color: '#161616' }}
          >
            All projects →
          </Link>
        </div>

        {cases.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
          >
            <p className="text-sm" style={{ color: '#888' }}>
              No cases yet — run{' '}
              <code
                className="text-xs rounded px-1.5 py-0.5"
                style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
              >
                pnpm migrate
              </code>{' '}
              to populate content.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c) => {
              const img = mediaUrl(c.featuredImage)
              const cats = (c.categories ?? []).map((x) => x.category).filter(Boolean) as string[]
              return (
                <article
                  key={c.id}
                  className="group rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: '#fff' }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/9', backgroundColor: '#d4d1ce' }}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={mediaAlt(c.featuredImage) || c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background:
                            'repeating-linear-gradient(45deg, #bbb 0px, #bbb 1px, transparent 1px, transparent 12px)',
                        }}
                      />
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {cats.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cats.slice(0, 3).map((cat) => {
                          const { bg, text } = catPalette(cat)
                          return (
                            <span
                              key={cat}
                              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                              style={{ backgroundColor: bg, color: text }}
                            >
                              {cat}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className="font-bold text-base leading-snug"
                        style={{ color: '#161616' }}
                      >
                        {c.title}
                      </h3>
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: '#fb6962', color: '#fff' }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#fff', padding: '96px 0' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#aaa' }}
            >
              Testimonials
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold"
              style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
            >
              Customer praise
            </h2>
          </div>

          {testimonials.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{ backgroundColor: '#E3E0DD' }}
            >
              <p className="text-sm" style={{ color: '#888' }}>
                No testimonials yet — run{' '}
                <code
                  className="text-xs rounded px-1.5 py-0.5"
                  style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
                >
                  pnpm migrate
                </code>{' '}
                to populate content.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t) => {
                const avatarUrl = mediaUrl(t.clientAvatar)
                return (
                  <div
                    key={t.id}
                    className="rounded-2xl p-7 flex flex-col gap-5"
                    style={{ backgroundColor: '#E3E0DD' }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" fill="#fb6962" className="w-4 h-4">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p
                      className="text-sm leading-relaxed flex-grow"
                      style={{ color: '#444', fontStyle: 'italic' }}
                    >
                      &ldquo;{t.testimonialText}&rdquo;
                    </p>

                    {/* Author */}
                    <div
                      className="flex items-center gap-3 pt-4"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
                    >
                      {avatarUrl ? (
                        <div
                          className="relative flex-shrink-0 rounded-full overflow-hidden"
                          style={{ width: 40, height: 40 }}
                        >
                          <Image
                            src={avatarUrl}
                            alt={t.clientName}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ width: 40, height: 40, backgroundColor: '#fb6962' }}
                        >
                          {(t.clientName?.[0] ?? '?').toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#161616' }}>
                          {t.clientName}
                        </p>
                        {t.role && (
                          <p className="text-xs" style={{ color: '#888' }}>{t.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Tech stack ────────────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6" style={{ padding: '96px 0' }}>
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#999' }}
          >
            Technology
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
          >
            Expertise in modern web platforms
          </h2>
        </div>

        {/* 2 rows of 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-5 hover:shadow-sm transition-shadow"
              style={{ backgroundColor: '#fff' }}
            >
              <p
                className="font-bold text-sm mb-1"
                style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
              >
                {t.name}
              </p>
              <p className="text-xs" style={{ color: '#aaa' }}>{t.cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA / Contact ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ backgroundColor: '#161616', padding: '96px 0' }}>
        <div className="max-w-[720px] mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#555' }}
            >
              Contact
            </p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              Let&apos;s talk! ☕
            </h2>
            <p className="text-base" style={{ color: '#777' }}>
              Tell us about your project and we&apos;ll get back to you within one business day.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

    </div>
  )
}
