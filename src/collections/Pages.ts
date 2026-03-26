import type { CollectionConfig, CollectionSlug } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
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
      admin: {
        description: 'URL-friendly identifier. Maps to WordPress post_name.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'publish' },
        { label: 'Private', value: 'private' },
        { label: 'Pending Review', value: 'pending' },
        { label: 'Trash', value: 'trash' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Maps to WordPress post_date.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: { description: 'Maps to WordPress post_content.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Maps to WordPress post_excerpt.' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Maps to WordPress _thumbnail_id.' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages' as CollectionSlug,
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress post_parent.',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress menu_order.',
      },
    },
    {
      name: 'template',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'WordPress page template (e.g. "default", "full-width").',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO / Meta',
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
        { name: 'noIndex', type: 'checkbox', label: 'No Index', defaultValue: false },
      ],
    },
    {
      name: 'wpId',
      type: 'number',
      label: 'WordPress Post ID',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Original WordPress post ID — migration mapping key.',
        readOnly: true,
      },
    },
    {
      name: 'wpGuid',
      type: 'text',
      label: 'WordPress GUID',
      admin: {
        position: 'sidebar',
        description: 'Original WordPress GUID URL.',
        readOnly: true,
      },
    },
  ],
}
