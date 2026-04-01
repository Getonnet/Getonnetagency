'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import './cases-slider.css'

type SliderCase = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: { url?: string | null; alt?: string | null } | null
  categories?: { category: string }[] | null
}

export default function CasesSlider({ cases }: { cases: SliderCase[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'prev' | 'next') {
    if (!trackRef.current) return
    const cardWidth = trackRef.current.querySelector('.cs-card')?.clientWidth ?? 400
    const gap = 32
    trackRef.current.scrollBy({ left: dir === 'next' ? cardWidth + gap : -(cardWidth + gap), behavior: 'smooth' })
  }

  return (
    <section className="cs-section">
      <h2 className="cs-title">Flere kundecaser</h2>

      <div className="cs-track" ref={trackRef}>
        {cases.map((c) => {
          const imgUrl = c.featuredImage?.url ?? null
          const cats = (c.categories ?? []).map((x) => x.category).filter(Boolean)
          return (
            <Link key={c.id} href={`/kundecaser/${c.slug}`} className="cs-card">
              <div className="cs-card__image">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={c.featuredImage?.alt ?? c.title}
                    fill
                    className="cs-card__img"
                  />
                ) : (
                  <div className="cs-card__placeholder" />
                )}
                {cats.length > 0 && (
                  <div className="cs-card__meta">
                    {cats.map((cat) => (
                      <span key={cat} className="cs-card__tag">{cat}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="cs-card__content">
                <div className="cs-card__text">
                  <h3 className="cs-card__title">{c.title}</h3>
                  {c.excerpt && <p className="cs-card__excerpt">{c.excerpt}</p>}
                </div>
                <span className="cs-card__arrow" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="cs-controls">
        <button className="cs-btn" onClick={() => scroll('prev')} aria-label="Forrige">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="cs-btn" onClick={() => scroll('next')} aria-label="Neste">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
