/**
 * WordPress → Payload CMS migration script.
 *
 * Run with:  pnpm migrate
 *
 * Migration order:
 *   1. Categories
 *   2. Tags
 *   3. Media (downloads image files from WordPress URLs)
 *   4. Posts
 *   5. Pages
 *   6. Cases  (post_type = kundecaser)
 *   7. Testimonials
 *   8. Team
 *
 * NOTE: dotenv is loaded via a dynamic import inside main() so that
 * process.env is populated before @payload-config is evaluated.
 * In ESM all static imports are hoisted and evaluated before any module-level
 * code runs, so a top-level `dotenv.config()` would fire too late.
 */

import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { fileURLToPath } from 'url'
// @ts-expect-error – jsdom has no bundled types; installed as devDep for vitest
import { JSDOM } from 'jsdom'
import { convertHTMLToLexical, defaultEditorConfig } from '@payloadcms/richtext-lexical'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const XML_PATH = path.resolve(__dirname, 'getonnet_WordPress_2026-03-27.xml')

// ─── XML helpers ────────────────────────────────────────────────────────────

function cdata(src: string, tag: string): string {
  const m = src.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))
  return m ? m[1].trim() : ''
}

function plain(src: string, tag: string): string {
  const m = src.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
  return m ? m[1].trim() : ''
}

function metaValue(src: string, key: string): string {
  const escaped = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  const m = src.match(
    new RegExp(
      `<wp:meta_key><!\\[CDATA\\[${escaped}\\]\\]><\\/wp:meta_key>\\s*<wp:meta_value><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/wp:meta_value>`,
    ),
  )
  return m ? m[1].trim() : ''
}

function allItems(xml: string): string[] {
  const items: string[] = []
  let pos = 0
  while (true) {
    const start = xml.indexOf('<item>', pos)
    if (start === -1) break
    const end = xml.indexOf('</item>', start)
    if (end === -1) break
    items.push(xml.slice(start, end + 7))
    pos = end + 7
  }
  return items
}

function categoriesOnItem(
  src: string,
): { domain: string; slug: string; name: string }[] {
  return [
    ...src.matchAll(
      /<category[^>]+domain="([^"]+)"[^>]*nicename="([^"]+)"[^>]*><!\[CDATA\[([^\]]*)\]\]><\/category>/g,
    ),
  ].map((m) => ({ domain: m[1], slug: m[2], name: m[3] }))
}

// ─── Rich-text conversion ────────────────────────────────────────────────────

function htmlToLexical(html: string) {
  if (!html.trim()) return undefined
  try {
    // defaultEditorConfig is ServerEditorConfig; cast to satisfy the SanitizedServerEditorConfig
    // parameter — safe for migration use since the lexical headless editor initialises its own state
    return convertHTMLToLexical({ editorConfig: defaultEditorConfig as any, html, JSDOM })
  } catch {
    // Fall back to a plain-text paragraph if conversion fails
    return {
      root: {
        children: [
          {
            children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: html, type: 'text', version: 1 }],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'root',
        version: 1,
      },
    }
  }
}

// ─── Media download ──────────────────────────────────────────────────────────

async function downloadFile(url: string): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = url.split('/').pop()!.split('?')[0]
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    pdf: 'application/pdf',
  }
  return { buffer, filename, mimeType: mimeMap[ext] ?? 'application/octet-stream' }
}

function bufferToReadable(buffer: Buffer): Readable {
  const readable = new Readable()
  readable.push(buffer)
  readable.push(null)
  return readable
}

// ─── Logging ─────────────────────────────────────────────────────────────────

function log(msg: string) {
  console.log(`[migrate] ${msg}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Load .env before importing Payload config so PAYLOAD_SECRET and DATABASE_URL
  // are in process.env when payload.config.ts is first evaluated.
  const { default: dotenv } = await import('dotenv')
  dotenv.config({ path: path.resolve(process.cwd(), '.env') })

  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('@payload-config')

  const payload = await getPayload({ config: configPromise })
  const xml = fs.readFileSync(XML_PATH, 'utf8')
  const items = allItems(xml)

  // wpId → Payload document id maps built up as we go
  const mediaIdMap = new Map<string, string>()   // wpId → payload id
  const categoryIdMap = new Map<string, string>() // wpId → payload id
  const tagIdMap = new Map<string, string>()      // slug  → payload id

  // ── 1. Categories ──────────────────────────────────────────────────────────
  log('── Categories ──')
  const catBlocks = [...xml.matchAll(/<wp:category>([\s\S]*?)<\/wp:category>/g)].map((m) => m[0])
  for (const block of catBlocks) {
    const wpId = plain(block, 'wp:term_id')
    const slug = cdata(block, 'wp:category_nicename')
    const name = cdata(block, 'wp:cat_name')
    if (!slug || !name) continue

    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  category "${name}" (exists)`)
      categoryIdMap.set(wpId, existing.docs[0].id as string)
      continue
    }

    const doc = await payload.create({ collection: 'categories', data: { name, slug, wpId: parseInt(wpId, 10) || undefined }, overrideAccess: true })
    categoryIdMap.set(wpId, doc.id as string)
    log(`  created category "${name}"`)
  }

  // ── 2. Tags ────────────────────────────────────────────────────────────────
  log('── Tags ──')
  const tagSet = new Map<string, string>() // slug → name
  for (const item of items) {
    for (const cat of categoriesOnItem(item)) {
      if (cat.domain === 'post_tag') tagSet.set(cat.slug, cat.name)
    }
  }
  for (const [slug, name] of tagSet) {
    const existing = await payload.find({ collection: 'tags', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  tag "${name}" (exists)`)
      tagIdMap.set(slug, existing.docs[0].id as string)
      continue
    }
    const doc = await payload.create({ collection: 'tags', data: { name, slug }, overrideAccess: true })
    tagIdMap.set(slug, doc.id as string)
    log(`  created tag "${name}"`)
  }

  // ── 3. Media ───────────────────────────────────────────────────────────────
  log('── Media ──')
  const attachments = items.filter((i) => cdata(i, 'wp:post_type') === 'attachment')
  for (const item of attachments) {
    const wpId = plain(item, 'wp:post_id')
    const url = cdata(item, 'wp:attachment_url')
    const title = cdata(item, 'title') || cdata(item, 'wp:post_name')
    if (!url) continue

    // Only migrate images
    if (!url.match(/\.(jpg|jpeg|png|gif|webp|svg|pdf)$/i)) {
      log(`  skip  attachment ${wpId} (non-image: ${url.split('/').pop()})`)
      continue
    }

    const existing = await payload.find({ collection: 'media', where: { wpId: { equals: parseInt(wpId, 10) } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  media "${title}" (exists)`)
      mediaIdMap.set(wpId, existing.docs[0].id as string)
      continue
    }

    try {
      const { buffer, filename, mimeType } = await downloadFile(url)
      const doc = await payload.create({
        collection: 'media',
        data: { alt: title, wpId: parseInt(wpId, 10) || undefined },
        file: { data: buffer, mimetype: mimeType, name: filename, size: buffer.length },
        overrideAccess: true,
      })
      mediaIdMap.set(wpId, doc.id as string)
      log(`  created media "${title}" (${wpId})`)
    } catch (err) {
      log(`  ERROR  media "${title}" (${wpId}): ${(err as Error).message}`)
    }
  }

  // ── 4. Posts ───────────────────────────────────────────────────────────────
  log('── Posts ──')
  const postItems = items.filter((i) => cdata(i, 'wp:post_type') === 'post')
  for (const item of postItems) {
    const title = cdata(item, 'title')
    const slug = cdata(item, 'wp:post_name')
    const wpId = plain(item, 'wp:post_id')
    if (!slug) continue

    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  post "${title}" (exists)`)
      continue
    }

    const htmlContent = cdata(item, 'content:encoded')
    const status = cdata(item, 'wp:status')
    const publishedAt = cdata(item, 'wp:post_date') || undefined
    const thumbWpId = metaValue(item, '_thumbnail_id')

    const itemCats = categoriesOnItem(item)
    const categoryIds = itemCats
      .filter((c) => c.domain === 'category')
      .map((c) => {
        for (const catBlk of catBlocks) {
          if (cdata(catBlk, 'wp:category_nicename') === c.slug) {
            return categoryIdMap.get(plain(catBlk, 'wp:term_id'))
          }
        }
        return undefined
      })
      .filter(Boolean) as string[]

    const tagIds = itemCats
      .filter((c) => c.domain === 'post_tag')
      .map((c) => tagIdMap.get(c.slug))
      .filter(Boolean) as string[]

    await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        status: (['draft', 'publish', 'private', 'pending', 'trash'].includes(status) ? status : 'draft') as any,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : undefined,
        content: htmlContent ? htmlToLexical(htmlContent) : undefined,
        excerpt: cdata(item, 'excerpt:encoded') || undefined,
        featuredImage: thumbWpId && mediaIdMap.has(thumbWpId) ? (mediaIdMap.get(thumbWpId) as any) : undefined,
        categories: categoryIds.length ? (categoryIds as any) : undefined,
        tags: tagIds.length ? (tagIds as any) : undefined,
        wpId: parseInt(wpId, 10) || undefined,
        wpGuid: cdata(item, 'guid') || undefined,
      },
      overrideAccess: true,
    })
    log(`  created post "${title}"`)
  }

  // ── 5. Pages ───────────────────────────────────────────────────────────────
  log('── Pages ──')
  const pageItems = items.filter((i) => cdata(i, 'wp:post_type') === 'page')
  for (const item of pageItems) {
    const title = cdata(item, 'title')
    const slug = cdata(item, 'wp:post_name')
    const wpId = plain(item, 'wp:post_id')
    if (!slug) continue

    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  page "${title}" (exists)`)
      continue
    }

    const htmlContent = cdata(item, 'content:encoded')
    const status = cdata(item, 'wp:status')
    const publishedAt = cdata(item, 'wp:post_date') || undefined
    const thumbWpId = metaValue(item, '_thumbnail_id')
    const menuOrder = plain(item, 'wp:menu_order')

    await payload.create({
      collection: 'pages',
      data: {
        title,
        slug,
        status: (['draft', 'publish', 'private', 'pending', 'trash'].includes(status) ? status : 'draft') as any,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : undefined,
        content: htmlContent ? htmlToLexical(htmlContent) : undefined,
        excerpt: cdata(item, 'excerpt:encoded') || undefined,
        featuredImage: thumbWpId && mediaIdMap.has(thumbWpId) ? (mediaIdMap.get(thumbWpId) as any) : undefined,
        menuOrder: menuOrder ? parseInt(menuOrder, 10) : undefined,
        wpId: parseInt(wpId, 10) || undefined,
        wpGuid: cdata(item, 'guid') || undefined,
      },
      overrideAccess: true,
    })
    log(`  created page "${title}"`)
  }

  // ── 6. Cases (kundecaser) ─────────────────────────────────────────────────
  log('── Cases ──')
  const caseItems = items.filter((i) => cdata(i, 'wp:post_type') === 'kundecaser')
  for (const item of caseItems) {
    const title = cdata(item, 'title')
    const slug = cdata(item, 'wp:post_name')
    if (!slug) continue

    const existing = await payload.find({ collection: 'cases', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  case "${title}" (exists)`)
      continue
    }

    const htmlContent = cdata(item, 'content:encoded')
    const heroWpId = metaValue(item, 'kundecase_hero_image')

    // Categories stored as array of text (the collection uses type:'array')
    const caseCatSlugs = categoriesOnItem(item)
      .filter((c) => c.domain === 'kundcase-kategori')
      .map((c) => ({ category: c.name }))

    await payload.create({
      collection: 'cases',
      data: {
        title,
        slug,
        content: htmlContent ? htmlToLexical(htmlContent) : undefined,
        featuredImage: heroWpId && mediaIdMap.has(heroWpId) ? (mediaIdMap.get(heroWpId) as any) : undefined,
        categories: caseCatSlugs.length ? caseCatSlugs : undefined,
      },
      overrideAccess: true,
    })
    log(`  created case "${title}"`)
  }

  // ── 7. Testimonials ───────────────────────────────────────────────────────
  log('── Testimonials ──')
  const testimonialItems = items.filter((i) => cdata(i, 'wp:post_type') === 'testimonial')
  for (const item of testimonialItems) {
    const clientName = metaValue(item, 'client_name') || cdata(item, 'title')
    const slug = cdata(item, 'wp:post_name')
    if (!slug) continue

    // Use slug as a unique check key (no slug field on Testimonials, use clientName in find)
    const existing = await payload.find({
      collection: 'testimonials',
      where: { clientName: { equals: clientName } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      log(`  skip  testimonial "${clientName}" (exists)`)
      continue
    }

    const avatarWpId = metaValue(item, 'client_avatar')

    await payload.create({
      collection: 'testimonials',
      data: {
        clientName,
        role: metaValue(item, 'role_title_location') || undefined,
        testimonialText: metaValue(item, 'testimonial_text') || undefined,
        clientAvatar: avatarWpId && mediaIdMap.has(avatarWpId) ? (mediaIdMap.get(avatarWpId) as any) : undefined,
      },
      overrideAccess: true,
    })
    log(`  created testimonial "${clientName}"`)
  }

  // ── 8. Team ───────────────────────────────────────────────────────────────
  log('── Team ──')
  const teamItems = items.filter((i) => cdata(i, 'wp:post_type') === 'team')
  for (const item of teamItems) {
    const name = cdata(item, 'title')
    const slug = cdata(item, 'wp:post_name')
    if (!slug) continue

    const existing = await payload.find({ collection: 'team', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (existing.totalDocs > 0) {
      log(`  skip  team "${name}" (exists)`)
      continue
    }

    const photoWpId = metaValue(item, 'team_image')

    await payload.create({
      collection: 'team',
      data: {
        name,
        slug,
        role: metaValue(item, 'titel') || undefined,
        photo: photoWpId && mediaIdMap.has(photoWpId) ? (mediaIdMap.get(photoWpId) as any) : undefined,
      },
      overrideAccess: true,
    })
    log(`  created team member "${name}"`)
  }

  log('── Migration complete ──')
  process.exit(0)
}

main().catch((err) => {
  console.error('[migrate] Fatal error:', err)
  process.exit(1)
})
