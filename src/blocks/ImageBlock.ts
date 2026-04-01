import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption shown below the image.' },
    },
    {
      name: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      defaultValue: false,
    },
  ],
}
