import type { CollectionConfig } from 'payload'

export const SupportSubmissions: CollectionConfig = {
  slug: 'support-submissions',
  admin: {
    useAsTitle: 'ticketName',
    defaultColumns: ['ticketName', 'firstName', 'email', 'category', 'severity', 'status', 'createdAt'],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Nettside', value: 'nettside' },
        { label: 'E-post', value: 'epost' },
        { label: 'Mobilapplikasjon', value: 'mobilapplikasjon' },
        { label: 'Salg', value: 'salg' },
        { label: 'Annonsering', value: 'annonsering' },
        { label: 'Annet', value: 'annet' },
      ],
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'severity',
      type: 'select',
      required: true,
      options: [
        { label: 'Lav', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'Høy – Driftkritisk feil', value: 'high' },
      ],
    },
    {
      name: 'website',
      type: 'text',
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
      name: 'ticketName',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'acceptedTerms',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
