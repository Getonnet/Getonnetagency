import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Maps to WordPress post_title.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL-friendly identifier. Maps to WordPress post_name.' },
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress post_author.',
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
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress category terms.',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress tag terms.',
      },
    },
    {
      name: 'format',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Aside', value: 'aside' },
        { label: 'Chat', value: 'chat' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Link', value: 'link' },
        { label: 'Image', value: 'image' },
        { label: 'Quote', value: 'quote' },
        { label: 'Status', value: 'status' },
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress post format.',
      },
    },
    {
      name: 'commentStatus',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress comment_status.',
      },
    },
    {
      name: 'pingStatus',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Maps to WordPress ping_status.',
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
