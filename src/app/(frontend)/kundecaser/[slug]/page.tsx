import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Case, Media } from '@/payload-types'
import RenderBlocks from '@/components/RenderBlocks'
import CasesSlider from '@/components/CasesSlider'
import CtaSection from '@/components/CtaSection'
import './case-single.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: await configPromise })
  const { docs } = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  const c = docs[0] as Case | undefined
  if (!c) return {}
  return {
    title: `${c.title} – GetOnNet Agency`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: await configPromise })
  const { docs } = await payload.find({ collection: 'cases', limit: 200, depth: 0, overrideAccess: true })
  return docs.map((c) => ({ slug: c.slug }))
}

function mediaUrl(f: unknown): string | null {
  if (!f || typeof f !== 'object') return null
  const m = f as Media
  if (m.url) return m.url
  if (m.filename) return `/api/media/file/${m.filename}`
  return null
}

export default async function CaseSinglePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: await configPromise })

  const { docs } = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })

  const c = docs[0] as Case | undefined
  if (!c) notFound()

  const { docs: related } = await payload.find({
    collection: 'cases',
    where: { slug: { not_equals: slug } },
    limit: 10,
    depth: 1,
    overrideAccess: true,
  })

  const sliderCases = related.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? null,
    featuredImage: r.featuredImage
      ? {
          url: mediaUrl(r.featuredImage) ?? null,
          alt: (r.featuredImage as Media)?.alt ?? null,
        }
      : null,
    categories: r.categories ?? null,
  }))

  return (
    <div className="case-single">
      {c.layout && c.layout.length > 0 && (
        <section className="case-content-section">
          <div className="case-container">
            <RenderBlocks blocks={c.layout as Parameters<typeof RenderBlocks>[0]['blocks']} />
          </div>
        </section>
      )}

      {sliderCases.length > 0 && <CasesSlider cases={sliderCases} />}
      <CtaSection />
    </div>
  )
}
