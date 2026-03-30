'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type SupportFormData = {
  category: string
  firstName: string
  lastName: string
  company: string
  severity: string
  website: string
  email: string
  phone: string
  ticketName: string
  description: string
  acceptedTerms: boolean
}

export async function submitSupportForm(
  data: SupportFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = await getPayload({ config: await config })

    await payload.create({
      collection: 'support-submissions',
      data: {
        category: data.category,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company || undefined,
        severity: data.severity,
        website: data.website || undefined,
        email: data.email,
        phone: data.phone || undefined,
        ticketName: data.ticketName,
        description: data.description,
        acceptedTerms: data.acceptedTerms,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('Support form submission error:', err)
    return { success: false, error: 'Noe gikk galt. Prøv igjen eller kontakt oss direkte.' }
  }
}
