import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Maps to WordPress display_name.' },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: { description: 'Maps to WordPress user_firstname meta.' },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: { description: 'Maps to WordPress user_lastname meta.' },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: { description: 'Maps to WordPress description (biographical info).' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website URL',
      admin: { description: 'Maps to WordPress user_url.' },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'subscriber',
      options: [
        { label: 'Administrator', value: 'administrator' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Subscriber', value: 'subscriber' },
      ],
      admin: { description: 'Maps to WordPress user role.' },
    },
    {
      name: 'wpId',
      type: 'number',
      label: 'WordPress User ID',
      unique: true,
      admin: {
        description: 'Original WordPress user ID — migration mapping key.',
        readOnly: true,
      },
    },
    {
      name: 'wpLogin',
      type: 'text',
      label: 'WordPress Login',
      admin: {
        description: 'Original WordPress user_login.',
        readOnly: true,
      },
    },
  ],
}
