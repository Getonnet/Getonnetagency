import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const MEDIA_DIR = path.resolve(process.cwd(), 'media')

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params
  const filePath = path.join(MEDIA_DIR, ...slug)

  // Block path-traversal attempts
  if (!filePath.startsWith(MEDIA_DIR + path.sep) && filePath !== MEDIA_DIR) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const ext = path.extname(filePath).slice(1).toLowerCase()
  const contentType = MIME[ext] ?? 'application/octet-stream'
  const buffer = fs.readFileSync(filePath)

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
