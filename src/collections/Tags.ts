import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Maps to WordPress term name.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Maps to WordPress term slug.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Maps to WordPress term description.' },
    },
    {
      name: 'wpId',
      type: 'number',
      label: 'WordPress Term ID',
      unique: true,
      admin: {
        description: 'Original WordPress term_id — migration mapping key.',
        readOnly: true,
      },
    },
  ],
}
