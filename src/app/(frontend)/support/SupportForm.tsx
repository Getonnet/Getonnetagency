'use client'

import React, { useState } from 'react'

import { submitSupportForm } from './actions'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SupportForm() {
  const [category, setCategory] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [severity, setSeverity] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [ticketName, setTicketName] = useState('')
  const [description, setDescription] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const canSubmit =
    category &&
    firstName &&
    lastName &&
    severity &&
    email &&
    ticketName &&
    description &&
    acceptedTerms &&
    acceptedPrivacy &&
    status !== 'loading'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await submitSupportForm({
      category,
      firstName,
      lastName,
      company,
      severity,
      website,
      email,
      phone,
      ticketName,
      description,
      acceptedTerms,
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
      <div className="support-form__success">
        <div className="support-form__success-icon">✓</div>
        <h2>Takk for din henvendelse!</h2>
        <p>Vi tar kontakt med deg innen ett døgn.</p>
      </div>
    )
  }

  return (
    <form className="support-form" onSubmit={handleSubmit} noValidate>
      <div className="support-form__header">
        <h2>Hva kan vi hjelpe deg med?</h2>
        <p>Fyll gjerne ut skjemaet nedenfor, så vil vi kontakte deg så fort som mulig.</p>
      </div>

      <div className="support-form__fields">
        {/* Category */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="category" className="support-form__label">
            Hva gjelder henvendelsen? <span className="support-form__required">*</span>
          </label>
          <select
            id="category"
            className="support-form__select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Velg alternativ</option>
            <option value="nettside">Nettside</option>
            <option value="epost">E-post</option>
            <option value="mobilapplikasjon">Mobilapplikasjon</option>
            <option value="salg">Salg</option>
            <option value="annonsering">Annonsering</option>
            <option value="annet">Annet</option>
          </select>
        </div>

        {/* Name row */}
        <div className="support-form__field">
          <label htmlFor="firstName" className="support-form__label">
            Fornavn <span className="support-form__required">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className="support-form__input"
            placeholder="Fornavn"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="support-form__field">
          <label htmlFor="lastName" className="support-form__label">
            Etternavn <span className="support-form__required">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className="support-form__input"
            placeholder="Etternavn"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Company */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="company" className="support-form__label">
            Bedriftsnavn
          </label>
          <input
            id="company"
            type="text"
            className="support-form__input"
            placeholder="Bedriftsnavn"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Severity */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="severity" className="support-form__label">
            Hvor kritisk er denne feilen? <span className="support-form__required">*</span>
          </label>
          <select
            id="severity"
            className="support-form__select"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          >
            <option value="">Velg nivå</option>
            <option value="low">🟢 Lav</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 Høy – Driftkritisk feil</option>
          </select>
        </div>

        {/* Website */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="website" className="support-form__label">
            Nettside
          </label>
          <input
            id="website"
            type="text"
            className="support-form__input"
            placeholder="https://"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Email + Phone */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="email" className="support-form__label">
            Hvilken e-post ønsker du å kontaktes på? <span className="support-form__required">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="support-form__input"
            placeholder="Hvilken e-post ønsker du å kontaktes på?"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="support-form__field support-form__field--full">
          <label htmlFor="phone" className="support-form__label">
            Hvilket telefonnummer kan vi nå deg på?
          </label>
          <input
            id="phone"
            type="tel"
            className="support-form__input"
            placeholder="Hvilket telefonnummer kan vi nå deg på?"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Ticket name */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="ticketName" className="support-form__label">
            Navn på ticket <span className="support-form__required">*</span>
          </label>
          <input
            id="ticketName"
            type="text"
            className="support-form__input"
            placeholder="Overskrift som gir oss innblikk i hva henvendelsen gjelder"
            required
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
          />
          <span className="support-form__helper">
            Overskrift som gir oss innblikk i hva henvendelsen gjelder
          </span>
        </div>

        {/* Description */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="description" className="support-form__label">
            Beskrivelse av problemet <span className="support-form__required">*</span>
          </label>
          <textarea
            id="description"
            className="support-form__textarea"
            rows={6}
            placeholder="Beskriv problemet så detaljert som mulig..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="support-form__helper">
            Gi så mange detaljer du klarer slik at vi kan gjøre nødvendig feilsøking før vi
            kontakter deg igjen. Eksempler: hvordan oppsto problemet, hva trykket du på, hvilken
            URL skjedde det på, hva sto det i feilmeldingen.
          </span>
        </div>

        {/* File upload */}
        <div className="support-form__field support-form__field--full">
          <label htmlFor="files" className="support-form__label">
            Legg ved filer
          </label>
          <label htmlFor="files" className="support-form__file-area">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <span>Klikk for å laste opp filer</span>
            <input id="files" type="file" multiple className="support-form__file-input" />
          </label>
          <span className="support-form__helper">
            Dersom du har skjermbilder eller andre dokumenter som er relevante for problemet kan du
            legge dem til her.
          </span>
        </div>

        {/* Terms checkboxes */}
        <div className="support-form__field support-form__field--full">
            <span className="support-form__helper"><strong>Kjøpsbetingelser</strong></span>
            <span className="support-form__helper">
              Jeg forstår at dersom henvendelsen min ikke dekkes av min driftsavtale, blir jeg belastet med 1390 kr/time inntil problemet er løst. Jeg er også innforstått med at alt arbeid faktureres per påbegynte halvtime. Dette gjelder gjelder henvendelser om problemer relatert til nettside, e-post, mobilapplikasjon, etc. Se vår oversikt på<a href="https://getonnet.no/priser">getonnet.no/priser</a> for oversikt over hva som er inkludert i din driftsavtale.
            </span>
        </div>
        <div className="support-form__field support-form__field--full">
          <label className="support-form__checkbox-label">
            <input
              type="checkbox"
              className="support-form__checkbox"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              required
            />
            <span>
              Jeg har lest og forstått{' '}
              <a href="/personvern" className="support-form__link">
                kjøpsbetingelsene
              </a>{' '}
              <span className="support-form__required">*</span>
            </span>
          </label>
        </div>
      </div>

      {status === 'error' && <p className="support-form__error">{errorMsg}</p>}

      <div className="support-form__actions">
        <button type="submit" className="support-form__btn" disabled={!canSubmit}>
          {status === 'loading' ? 'Sender...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
