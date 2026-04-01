import type { Block } from 'payload'

export const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  labels: { singular: 'Two Column', plural: 'Two Column Blocks' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo / Icon (max height 32px)',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background color',
      admin: { description: 'Any valid CSS color value, e.g. #f5f5f5 or rgba(0,0,0,0.05).' },
    },
    {
      name: 'padding',
      type: 'number',
      label: 'Padding (px)',
      defaultValue: 0,
      admin: { description: 'Inner padding applied when a background color is set.' },
    },
    {
      name: 'borderRadius',
      type: 'number',
      label: 'Border radius (px)',
      defaultValue: 0,
    },
    {
      name: 'imageWidth',
      type: 'number',
      label: 'Image width (%)',
      defaultValue: 50,
      min: 20,
      max: 80,
      admin: { description: 'Width of the image column as a percentage (20–80). Default: 50.' },
    },
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Image position',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images (max 4)',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
