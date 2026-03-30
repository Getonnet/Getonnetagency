import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'services', 'status', 'createdAt'],
    group: 'CRM',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Nettside', value: 'nettside' },
        { label: 'Webutvikling', value: 'webutvikling' },
        { label: 'Apputvikling', value: 'apputvikling' },
        { label: 'AI', value: 'ai' },
        { label: 'Nettbutikk', value: 'nettbutikk' },
        { label: 'Annonsering', value: 'annonsering' },
        { label: 'Branding', value: 'branding' },
        { label: 'UX/UI Design', value: 'ux-ui-design' },
        { label: 'Annen', value: 'annen' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
