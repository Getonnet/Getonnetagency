import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author name',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Author role / company',
    },
  ],
}
