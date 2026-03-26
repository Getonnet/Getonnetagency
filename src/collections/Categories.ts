import type { CollectionConfig, CollectionSlug } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'updatedAt'],
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
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      admin: { description: 'Maps to WordPress parent term ID.' },
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
