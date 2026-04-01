import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      label: 'Quote',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name / Title',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position / Company',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (max height 32px)',
    },
  ],
}
