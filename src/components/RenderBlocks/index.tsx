import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Media } from '@/payload-types'

type RichTextBlock = {
  blockType: 'richText'
  content: unknown
}

type ImageBlock = {
  blockType: 'image'
  image: Media | string | null
  caption?: string | null
  fullWidth?: boolean | null
}

type QuoteBlock = {
  blockType: 'quote'
  quote: string
  author?: string | null
  role?: string | null
}

type TwoColumnBlock = {
  blockType: 'twoColumn'
  logo?: Media | string | null
  heading?: string | null
  body?: unknown
  categories?: { category: string }[] | null
  backgroundColor?: string | null
  padding?: number | null
  borderRadius?: number | null
  imageWidth?: number | null
  imagePosition?: 'left' | 'right' | null
  images?: { image: Media | string | null }[] | null
}

type TestimonialBlock = {
  blockType: 'testimonial'
  content: string
  name: string
  position?: string | null
  logo?: Media | string | null
}

type ConclusionBlock = {
  blockType: 'conclusion'
  heading?: string | null
  content?: string | null
  counters?: { number: string; title: string }[] | null
}

type Block = RichTextBlock | ImageBlock | QuoteBlock | TwoColumnBlock | TestimonialBlock | ConclusionBlock

function mediaUrl(image: Media | string | null | undefined): string | null {
  if (!image || typeof image === 'string') return null
  if (image.url) return image.url
  if (image.filename) return `/api/media/file/${image.filename}`
  return null
}

function RichTextBlockRender({ block }: { block: RichTextBlock }) {
  if (!block.content) return null
  return (
    <div className="rb-richtext">
      <RichText data={block.content} />
    </div>
  )
}

function ImageBlockRender({ block }: { block: ImageBlock }) {
  const url = mediaUrl(block.image as Media | null)
  if (!url) return null
  const media = block.image as Media | null
  return (
    <figure className={`rb-image${block.fullWidth ? ' rb-image--full' : ''}`}>
      <div className="rb-image__wrap">
        <Image
          src={url}
          alt={media?.alt ?? ''}
          width={media?.width ?? 1200}
          height={media?.height ?? 675}
          className="rb-image__img"
        />
      </div>
      {block.caption && <figcaption className="rb-image__caption">{block.caption}</figcaption>}
    </figure>
  )
}

function QuoteBlockRender({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="rb-quote">
      <p className="rb-quote__text">{block.quote}</p>
      {block.author && (
        <footer className="rb-quote__footer">
          <span className="rb-quote__author">{block.author}</span>
          {block.role && <span className="rb-quote__role">{block.role}</span>}
        </footer>
      )}
    </blockquote>
  )
}

function ConclusionBlockRender({ block }: { block: ConclusionBlock }) {
  const counters = block.counters ?? []
  return (
    <div className="rb-conclusion">
      {block.heading && <h2 className="rb-conclusion__heading">{block.heading}</h2>}
      {block.content && <p className="rb-conclusion__content">{block.content}</p>}
      {counters.length > 0 && (
        <div className="rb-conclusion__counters">
          {counters.map((c, i) => (
            <div key={i} className="rb-conclusion__counter">
              <span className="rb-conclusion__number">{c.number}</span>
              <span className="rb-conclusion__title">{c.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TestimonialBlockRender({ block }: { block: TestimonialBlock }) {
  const logoUrl = mediaUrl(block.logo as Media | null)
  const logoMedia = block.logo as Media | null
  return (
    <div className="rb-testimonial">
      <div className="rb-testimonial__stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <p className="rb-testimonial__content">{block.content}</p>
      <div className="rb-testimonial__footer">
        <div className="rb-testimonial__author">
          <span className="rb-testimonial__name">{block.name}</span>
          {block.position && <span className="rb-testimonial__position">{block.position}</span>}
        </div>
        {logoUrl && (
          <div className="rb-testimonial__logo">
            <Image
              src={logoUrl}
              alt={logoMedia?.alt ?? ''}
              width={logoMedia?.width ?? 160}
              height={logoMedia?.height ?? 32}
              className="rb-testimonial__logo-img"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function TwoColumnBlockRender({ block }: { block: TwoColumnBlock }) {
  const logoUrl = mediaUrl(block.logo as Media | null)
  const logoMedia = block.logo as Media | null
  const cats = (block.categories ?? []).map((x) => x.category).filter(Boolean)
  const images = (block.images ?? []).filter((item) => item.image)

  const imageLeft = block.imagePosition === 'left'
  const imgFr = block.imageWidth ?? 50
  const contentFr = 100 - imgFr
  const gridColumns = imageLeft
    ? `${imgFr}fr ${contentFr}fr`
    : `${contentFr}fr ${imgFr}fr`

  const wrapperStyle: React.CSSProperties = {}
  if (block.backgroundColor) wrapperStyle.backgroundColor = block.backgroundColor
  if (block.padding) wrapperStyle.padding = `${block.padding}px`
  if (block.borderRadius) wrapperStyle.borderRadius = `${block.borderRadius}px`

  const multiImage = images.length > 1

  return (
    <div
      className={`rb-twocol${imageLeft ? ' rb-twocol--image-left' : ''}`}
      style={{ ...wrapperStyle, gridTemplateColumns: gridColumns }}
    >
      <div className="rb-twocol__left">
        {logoUrl && (
          <div className="rb-twocol__logo">
            <Image
              src={logoUrl}
              alt={logoMedia?.alt ?? ''}
              width={logoMedia?.width ?? 160}
              height={logoMedia?.height ?? 32}
              className="rb-twocol__logo-img"
            />
          </div>
        )}
        {block.heading && <h2 className="rb-twocol__heading">{block.heading}</h2>}
        {block.body && (
          <div className="rb-twocol__body">
            <RichText data={block.body} />
          </div>
        )}
        {cats.length > 0 && (
          <div className="rb-twocol__tags">
            {cats.map((cat) => (
              <span key={cat} className="rb-twocol__tag">{cat}</span>
            ))}
          </div>
        )}
      </div>

      <div className={`rb-twocol__right${multiImage ? ' rb-twocol__right--grid' : ''}`}>
        {images.map((item, i) => {
          const url = mediaUrl(item.image as Media | null)
          const media = item.image as Media | null
          if (!url) return null
          return (
            <div key={i} className="rb-twocol__img-wrap">
              <Image
                src={url}
                alt={media?.alt ?? ''}
                fill
                className="rb-twocol__img"
              />
            </div>
          )
        })}
        {images.length === 0 && <div className="rb-twocol__placeholder" />}
      </div>
    </div>
  )
}

export default function RenderBlocks({ blocks }: { blocks: Block[] | null | undefined }) {
  if (!blocks?.length) return null
  return (
    <div className="render-blocks">
      {blocks.map((block, i) => {
        if (block.blockType === 'richText') return <RichTextBlockRender key={i} block={block} />
        if (block.blockType === 'image') return <ImageBlockRender key={i} block={block} />
        if (block.blockType === 'quote') return <QuoteBlockRender key={i} block={block} />
        if (block.blockType === 'conclusion') return <ConclusionBlockRender key={i} block={block} />
        if (block.blockType === 'testimonial') return <TestimonialBlockRender key={i} block={block} />
        if (block.blockType === 'twoColumn') return <TwoColumnBlockRender key={i} block={block} />
        return null
      })}
    </div>
  )
}
