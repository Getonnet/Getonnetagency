import Image from 'next/image'
import React from 'react'

import './hero.css'

type HeroSectionProps = {
  subtitle?: string
  title: string
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  className?: string
}

export default function HeroSection({ subtitle, title, image, className = '' }: HeroSectionProps) {
  return (
    <section className={`hero ${className}`}>
      <div className="hero__container">
        <div className="hero__text">
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
          <h1 className="hero__title">{title}</h1>
        </div>

        {image && (
          <div className="hero__image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1280}
              height={image.height ?? 640}
              className="hero__image"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
