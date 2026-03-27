'use client'

import React, { useState } from 'react'

const TOPICS = [
  'Website',
  'Web development',
  'App development',
  'AI',
  'Online store',
  'Advertising',
  'Branding',
  'UX/UI Design',
  'Other',
]

export default function ContactForm() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function toggleTopic(t: string) {
    setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // TODO: connect to /api/contact or CRM
      await new Promise((r) => setTimeout(r, 900))
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setSelectedTopics([])
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-white text-lg font-semibold">Thanks! We&apos;ll be in touch soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline"
          style={{ color: '#999' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Topic pills */}
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: '#888' }}>
          What can we help you with?
        </p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = selectedTopics.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTopic(t)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                style={
                  active
                    ? { backgroundColor: '#fb6962', borderColor: '#fb6962', color: '#fff' }
                    : {
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: '#aaa',
                      }
                }
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#fb6962]/50"
          style={{
            backgroundColor: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
          }}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#fb6962]/50"
          style={{
            backgroundColor: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
          }}
        />
      </div>
      <textarea
        required
        name="message"
        placeholder="Tell us about your project..."
        rows={5}
        value={form.message}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#fb6962]/50"
        style={{
          backgroundColor: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff',
        }}
      />

      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#fb6962' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && (
          <span className="text-sm text-red-400">Something went wrong. Try again.</span>
        )}
      </div>
    </form>
  )
}
