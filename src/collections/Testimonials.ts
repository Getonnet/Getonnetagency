import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'role', 'updatedAt'],
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'testimonialText',
      type: 'textarea',
    },
    {
      name: 'clientAvatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
