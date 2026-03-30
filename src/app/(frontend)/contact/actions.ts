'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type ContactFormData = {
  services: string[]
  message: string
  name: string
  email: string
  phone: string
  company: string
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = await getPayload({ config: await config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        company: data.company || undefined,
        services: data.services.length > 0 ? data.services : undefined,
        message: data.message || undefined,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('Contact form submission error:', err)
    return { success: false, error: 'Noe gikk galt. Prøv igjen eller kontakt oss direkte.' }
  }
}
