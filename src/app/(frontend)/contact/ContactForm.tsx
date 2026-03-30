'use client'

import React, { useState } from 'react'

import { submitContactForm } from './actions'

const SERVICES = [
  'Nettside',
  'Webutvikling',
  'Apputvikling',
  'AI',
  'Nettbutikk',
  'Annonsering',
  'Branding',
  'UX/UI Design',
  'Annen',
]

const TOTAL_STEPS = 3

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    )
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await submitContactForm({
      services,
      message,
      name,
      email,
      phone,
      company,
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Noe gikk galt.')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form__success">
        <div className="contact-form__success-icon">✓</div>
        <h2>Takk for din henvendelse!</h2>
        <p>Vi tar kontakt med deg innen kort tid.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {step === 1 && (
        <div className="contact-form__panel">
          <div className="contact-form__panel-header">
            <h2>Jeg vil snakke om...</h2>
            <p>Du kan velge flere.</p>
          </div>
          <div className="contact-form__services">
            {SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                className={`contact-form__service-pill ${services.includes(service) ? 'selected' : ''}`}
                onClick={() => toggleService(service)}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="contact-form__actions">
            <button type="button" className="contact-form__btn-primary" onClick={next}>
              Neste
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="contact-form__panel">
          <div className="contact-form__field">
            <label htmlFor="message" className="contact-form__label">
              Gi oss et lite hint om hva du ønsker å diskutere
            </label>
            <textarea
              id="message"
              className="contact-form__textarea"
              rows={6}
              placeholder="Fortell oss litt om prosjektet ditt..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="contact-form__actions">
            <button type="button" className="contact-form__btn-secondary" onClick={back}>
              Tilbake
            </button>
            <button type="button" className="contact-form__btn-primary" onClick={next}>
              Neste
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="contact-form__panel">
          <div className="contact-form__fields">
            <div className="contact-form__field contact-form__field--full">
              <label htmlFor="name" className="contact-form__label">
                Navn <span className="contact-form__required">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="contact-form__input"
                placeholder="Navn"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="contact-form__field">
              <label htmlFor="email" className="contact-form__label">
                E-post <span className="contact-form__required">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="contact-form__input"
                placeholder="E-post"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="contact-form__field">
              <label htmlFor="phone" className="contact-form__label">
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                className="contact-form__input"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="contact-form__field contact-form__field--full">
              <label htmlFor="company" className="contact-form__label">
                Firmanavn
              </label>
              <input
                id="company"
                type="text"
                className="contact-form__input"
                placeholder="Firmanavn"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          {status === 'error' && <p className="contact-form__error">{errorMsg}</p>}

          <p className="contact-form__privacy">
            Når du klikker &ldquo;Send&rdquo;, godtar du at GetOnNet kan bruke dine personlige data
            til å kontakte deg og gi informasjon. Les våre{' '}
            <a href="/personvern" className="contact-form__privacy-link">
              personvernregler
            </a>
            .
          </p>

          <div className="contact-form__actions">
            <button type="button" className="contact-form__btn-secondary" onClick={back}>
              Tilbake
            </button>
            <button
              type="submit"
              className="contact-form__btn-primary"
              disabled={status === 'loading' || !name || !email}
            >
              {status === 'loading' ? 'Sender...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
