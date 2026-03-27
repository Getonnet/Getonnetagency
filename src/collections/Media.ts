import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'wpId',
      type: 'number',
      label: 'WordPress Attachment ID',
      unique: true,
      admin: {
        description: 'Original WordPress attachment post ID — migration mapping key.',
        readOnly: true,
      },
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
  },
}
