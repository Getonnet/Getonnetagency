'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import './kundecaser.css'

type CaseItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: { url?: string | null; alt?: string | null } | null
  categories?: { category: string }[] | null
}

export default function KundecaserPage() {
  const [cases, setCases] = useState<CaseItem[]>([])

  useEffect(() => {
    fetch('/api/cases?limit=100&depth=1')
      .then((r) => r.json())
      .then((data) => {
        const docs: CaseItem[] = data.docs ?? []
        setCases(docs)
      })
  }, [])

  return (
    <div className="kundecaser-page">
      <section className="kundecaser-hero">
        <h1>Kundecaser</h1>
      </section>

      <section className="kundecaser-section">
        <div className="kundecaser-container">

          {cases.length === 0 ? (
            <p className="kundecaser-empty">Ingen caser funnet.</p>
          ) : (
            <div className="kundecaser-grid">
              {cases.map((c) => {
                const imgUrl = c.featuredImage?.url ?? null
                const cats = (c.categories ?? []).map((x) => x.category).filter(Boolean)
                return (
                  <Link key={c.id} href={`/kundecaser/${c.slug}`} className="kundecase-card">
                    <div className="kundecase-card__image">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={c.featuredImage?.alt ?? c.title}
                          fill
                          className="kundecase-card__img"
                        />
                      ) : (
                        <div className="kundecase-card__placeholder" />
                      )}
                      {cats.length > 0 && (
                        <div className="kundecase-card__meta">
                          {cats.map((cat) => (
                            <span key={cat} className="kundecase-card__tag">{cat}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="kundecase-card__content">
                      <div className="kundecase-card__text">
                        <h2 className="kundecase-card__title">{c.title}</h2>
                        {c.excerpt && <p className="kundecase-card__excerpt">{c.excerpt}</p>}
                      </div>
                      <span className="kundecase-card__arrow" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
