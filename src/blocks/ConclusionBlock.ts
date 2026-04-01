import type { Block } from 'payload'

export const ConclusionBlock: Block = {
  slug: 'conclusion',
  labels: { singular: 'Conclusion', plural: 'Conclusion Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Content',
    },
    {
      name: 'counters',
      type: 'array',
      label: 'Counters',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
          required: true,
          admin: { description: 'e.g. 120% or 3x' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
      ],
    },
  ],
}
