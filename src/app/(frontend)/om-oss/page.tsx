import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { Media } from '@/payload-types'
import HeroSection from '@/components/HeroSection'
import './om-oss.css'

export const metadata: Metadata = {
  title: 'Om oss – GetOnNet Agency',
  description:
    'Vi er en totalleverandør av digitale løsninger – strategi, kreativitet og teknisk kompetanse under ett tak.',
}

const STATS = [
  { value: '6+', label: 'Ansatte' },
  { value: '2000', label: 'Grunnlagt' },
  { value: '2', label: 'Land' },
  { value: '20+', label: 'Års erfaring' },
]

const VALUES = [
  {
    number: '01',
    text: 'Levere kvalitativ og tydelig kommunikasjon',
  },
  {
    number: '02',
    text: 'Være effektive i vår arbeidsprosess',
  },
  {
    number: '03',
    text: 'Bry oss om våre kunder og hverandre',
  },
  {
    number: '04',
    text: 'Stimulere kunnskapsutvikling og læring',
  },
]

function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const node = data as { root?: unknown; text?: string; children?: unknown[] }
  if (node.root) return lexicalToPlainText(node.root)
  const parts: string[] = []
  if (node.text) parts.push(node.text)
  if (Array.isArray(node.children)) {
    for (const child of node.children) parts.push(lexicalToPlainText(child))
  }
  return parts.join(' ').trim()
}

function TeamInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
  return <span className="team-card__initials">{initials}</span>
}

export default async function OmOssPage() {
  const payload = await getPayload({ config: await configPromise })
  const { docs: team } = await payload.find({ collection: 'team', limit: 100, depth: 1, overrideAccess: true })

  return (
    <div className="om-oss-page">
      <HeroSection
        subtitle="Om oss"
        title="Vi utvikler og designer nye digitale løsninger."
        image={{ src: '/api/media/file/om-oss-getonnetagency.jpg', alt: 'Om GetOnNet', width: 1280, height: 600 }}
      />

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="om-oss-section om-oss-stats">
        <div className="om-oss-container">
          <div className="stats-layout">
            <h2 className="om-oss-section__title">GetOnNet i tall</h2>
            <div className="stats-grid">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-card__value">{stat.value}</span>
                  <span className="stat-card__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section className="om-oss-section om-oss-about">
        <div className="om-oss-container">
          <div className="om-oss-split">
            <h2 className="om-oss-section__title">Om GetOnNet</h2>
            <div className="om-oss-about__body">
              <p>
                GetOnNet er totalleverandør av digitale løsninger som gir resultater. Hos oss er strategisk, kreativ og teknologisk kompetanse samlet under ett enkelt tak; slik kan vi levere robuste og helhetlige løsninger for våre kunder.
              </p>
              <p>
                Vi er et tverrfaglig team som elsker hårete mål og nye utfordringer. Hos GetOnNet finner du problemløsere, ordsmeder, illustratører, opplevelsesarkitekter og kodeknusere. Vår ekspertise ligger innen digitale produkter, AI, web, app og digital markedsføring.
              </p>
              <p>
                Med bred erfaring, strømlinjeformede prosesser og profesjonell prosjektledelse kan vi levere skreddersydde løsninger med kvalitet i alle ledd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────── */}
      <section className="om-oss-section om-oss-values">
        <div className="om-oss-container">
          <div className="om-oss-split">
            <h2 className="om-oss-section__title">Våre verdier</h2>
            <div className="values-right">
              <p className="values-intro">Hos GetOnNet streber vi etter å</p>
              <ul className="values-list">
                {VALUES.map((value) => (
                  <li key={value.number} className="value-item">
                    <span className="value-item__icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 10L20 15L15 20" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4V11C4 12.0609 4.42143 13.0783 5.17157 13.8284C5.92172 14.5786 6.93913 15 8 15H20" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span className="value-item__text">{value.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="om-oss-split">
            <div className="om-oss-about-images__col">
              <Image
                src="/api/media/file/getonnet-team-2.jpg"
                alt="GetOnNet team"
                width={800}
                height={600}
                className="om-oss-about-images__img"
              />
            </div>
            <div className="om-oss-about-images__col">
              <Image
                src="/api/media/file/getonnet-about-2.jpg"
                alt="Om GetOnNet"
                width={800}
                height={600}
                className="om-oss-about-images__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────── */}
      <section className="om-oss-section om-oss-team">
        <div className="om-oss-container">
          <h2 className="om-oss-section__title">Møt vårt team</h2>
          <div className="team-grid">
            {team.map((member) => {
              const photo = member.photo as Media | null
              const photoUrl = photo?.url ?? null
              return (
                <div key={member.id} className="team-card">
                  <div className="team-card__photo">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={member.name}
                        width={280}
                        height={320}
                        className="team-card__img"
                      />
                    ) : (
                      <TeamInitials name={member.name} />
                    )}
                  </div>
                  <div className="team-card__info">
                    <h3 className="team-card__name">{member.name}</h3>
                    {member.role && <p className="team-card__role">{member.role}</p>}
                    {member.bio && (
                      <p className="team-card__bio">{lexicalToPlainText(member.bio)}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
