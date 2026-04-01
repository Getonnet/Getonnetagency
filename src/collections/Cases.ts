import type { CollectionConfig } from 'payload'

import { RichTextBlock } from '@/blocks/RichTextBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { QuoteBlock } from '@/blocks/QuoteBlock'
import { TwoColumnBlock } from '@/blocks/TwoColumnBlock'
import { TestimonialBlock } from '@/blocks/TestimonialBlock'
import { ConclusionBlock } from '@/blocks/ConclusionBlock'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL-friendly identifier.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown in listings.' },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [RichTextBlock, ImageBlock, QuoteBlock, TwoColumnBlock, TestimonialBlock, ConclusionBlock],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
