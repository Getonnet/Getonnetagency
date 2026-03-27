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

const NAV_LINKS = [
  { label: 'Projects', href: '#cases' },
  { label: 'Services', href: '#services' },
  { label: 'About us', href: '#about' },
  { label: 'Support', href: '#contact' },
]

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

const CLIENTS = ['Newsec', 'Mill', 'Biil.no', 'Pretakst', 'tAPMEHOME', 'SafeApp', 'Sveagruppen', 'BDO']

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

// gradient fallbacks for hero mosaic tiles
const TILE_GRADIENTS = [
  'from-blue-300 to-blue-500',
  'from-violet-300 to-violet-500',
  'from-amber-300 to-orange-400',
  'from-emerald-300 to-teal-500',
  'from-rose-300 to-pink-500',
  'from-cyan-300 to-sky-500',
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

  // Pad hero tiles to always have 6
  const heroTiles = Array.from({ length: 6 }, (_, i) => cases[i] ?? null)

  return (
    <div style={{ backgroundColor: '#E3E0DD', color: '#161616' }}>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: 'rgba(227,224,221,0.92)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="mx-auto flex items-center justify-between h-16 px-6"
          style={{ maxWidth: 1200 }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl tracking-tight"
            style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
          >
            GetOnNet
          </Link>

          {/* Centre links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: '#161616' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-semibold border-2 border-black/80 hover:bg-black hover:text-white transition-colors"
              style={{ color: '#161616' }}
            >
              Get a quote ✨
            </Link>
            <Link
              href="#contact"
              className="inline-flex px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#fb6962' }}
            >
              Let&apos;s talk ☕
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 72px' }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div>
            {/* Google badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                backgroundColor: '#fff',
                borderColor: 'rgba(0,0,0,0.1)',
                color: '#555',
              }}
            >
              <span className="text-yellow-400">★★★★★</span>
              <span>5,0 Google reviews</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
            >
              We develop and design digital products
            </h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: '#666', maxWidth: 480 }}>
              Full-service digital agency working at the intersection of people and digital
              technologies.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#fb6962' }}
              >
                Get a quote ✨
              </Link>
              <Link
                href="#cases"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold border-2 border-black/70 hover:bg-black hover:text-white transition-colors"
                style={{ color: '#161616' }}
              >
                See our work →
              </Link>
            </div>
          </div>

          {/* Right — 2-column staggered mosaic of 6 tiles */}
          <div className="hidden lg:flex gap-3 h-[500px] overflow-hidden">
            {/* Left sub-column */}
            <div className="flex flex-col gap-3 flex-1">
              {[0, 1, 2].map((idx) => {
                const c = heroTiles[idx]
                const img = c ? mediaUrl(c.featuredImage) : null
                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden shadow-sm ${idx === 0 ? 'flex-[2]' : 'flex-1'}`}
                    style={{ backgroundColor: '#d4d1ce' }}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={c ? (mediaAlt(c.featuredImage) || c.title) : ''}
                        fill
                        className="object-cover"
                        sizes="20vw"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${TILE_GRADIENTS[idx]!} opacity-60`}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right sub-column — offset down for stagger */}
            <div className="flex flex-col gap-3 flex-1 mt-10">
              {[3, 4, 5].map((idx) => {
                const c = heroTiles[idx]
                const img = c ? mediaUrl(c.featuredImage) : null
                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden shadow-sm ${idx === 4 ? 'flex-[2]' : 'flex-1'}`}
                    style={{ backgroundColor: '#d4d1ce' }}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={c ? (mediaAlt(c.featuredImage) || c.title) : ''}
                        fill
                        className="object-cover"
                        sizes="20vw"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${TILE_GRADIENTS[idx]!} opacity-60`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Client logos ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#161616', padding: '28px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: '#555' }}
          >
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold"
                style={{ color: '#4a4a4a', letterSpacing: '0.02em' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scandinavian design / Global results ──────────────────────────── */}
      <section id="about" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#999' }}
            >
              About us
            </p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
            >
              Scandinavian design.{' '}
              <span style={{ color: '#888' }}>Global results.</span>
            </h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: '#666' }}>
              We&apos;re an interdisciplinary team of problem solvers, wordsmiths, illustrators,
              experience architects and code breakers.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#666' }}>
              With expertise in digital products, AI, web, app and digital marketing — we build
              things that actually work.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { v: '15+', l: 'Years experience' },
                { v: '500+', l: 'Projects delivered' },
                { v: '5,0', l: 'Google rating' },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    className="text-4xl font-extrabold leading-none mb-1"
                    style={{ fontFamily: 'var(--font-bricolage)', color: '#161616' }}
                  >
                    {s.v}
                  </p>
                  <p className="text-sm" style={{ color: '#888' }}>{s.l}</p>
                </div>
              ))}
            </div>

            <Link
              href="#about"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#fb6962' }}
            >
              Read more about us →
            </Link>
          </div>

          {/* Right — organic blob composition */}
          <div className="relative h-72 lg:h-[420px] flex items-center justify-center">
            {/* Base blob */}
            <div
              className="absolute w-56 h-56 lg:w-72 lg:h-72"
              style={{
                background: 'linear-gradient(135deg, #fb6962 0%, #ff9a3c 100%)',
                borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                opacity: 0.9,
              }}
            />
            {/* Secondary blob */}
            <div
              className="absolute w-40 h-40 lg:w-52 lg:h-52"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '40% 60% 30% 70% / 60% 40% 50% 50%',
                opacity: 0.75,
                transform: 'translate(60px, -40px)',
              }}
            />
            {/* Third blob */}
            <div
              className="absolute w-32 h-32 lg:w-44 lg:h-44"
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #06b6d4 100%)',
                borderRadius: '50% 50% 30% 70% / 50% 30% 70% 50%',
                opacity: 0.7,
                transform: 'translate(-50px, 50px)',
              }}
            />
            {/* Small accent */}
            <div
              className="absolute w-20 h-20 lg:w-28 lg:h-28"
              style={{
                background: '#fcb900',
                borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%',
                opacity: 0.8,
                transform: 'translate(80px, 60px)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section id="services" style={{ backgroundColor: '#161616', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
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

          {/* Cards — horizontal scroll on mobile, 4-col on desktop */}
          <div className="services-track lg:grid lg:grid-cols-4 lg:gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="flex-shrink-0 w-72 lg:w-auto rounded-2xl p-6 flex flex-col gap-4 border hover:scale-[1.02] transition-transform cursor-default"
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

          {/* Carousel dots (decorative) */}
          <div className="flex justify-center gap-1.5 mt-8 lg:hidden">
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === 0 ? 20 : 6,
                  height: 6,
                  backgroundColor: i === 0 ? '#fb6962' : '#444',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases grid ────────────────────────────────────────────────────── */}
      <section id="cases" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px' }}>
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
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
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px' }}>
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
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
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

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#111', padding: '64px 0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            {/* Col 1 — brand + contact */}
            <div>
              <p
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                GetOnNet
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#555' }}>
                Full-service digital agency working at the intersection of people and digital
                technologies.
              </p>
              <div className="space-y-2 mb-6">
                <a
                  href="tel:+4735901500"
                  className="block text-sm transition-colors hover:text-white"
                  style={{ color: '#666' }}
                >
                  (+47) 35 90 15 00
                </a>
                <a
                  href="mailto:hello@getonnet.agency"
                  className="block text-sm transition-colors hover:text-white"
                  style={{ color: '#666' }}
                >
                  hello@getonnet.agency
                </a>
              </div>
              <div className="flex gap-4">
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/getonnet/' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/getonnet/' },
                  { label: 'Facebook', href: 'https://www.facebook.com/getonnetab' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium transition-colors hover:text-white"
                    style={{ color: '#555' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Services */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#444' }}
              >
                Services
              </p>
              <ul className="space-y-2.5">
                {[
                  'Web development',
                  'AI',
                  'App development',
                  'Digital advertising',
                  'UX/UI Design',
                  'Online stores',
                  'Branding',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#services"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#666' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Content */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#444' }}
              >
                Content
              </p>
              <ul className="space-y-2.5">
                {['Customer cases', 'Articles'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#666' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — GetOnNet */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#444' }}
              >
                GetOnNet
              </p>
              <ul className="space-y-2.5">
                {['About us', 'Contact', 'Support', 'Privacy policy'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#666' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs" style={{ color: '#3a3a3a' }}>
              © 2026 GetOnNet AS — Org nr 998 580 706
            </p>
            <div className="flex gap-5">
              {['Privacy policy', 'Terms'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: '#3a3a3a' }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
