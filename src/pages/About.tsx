import { Link } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import type { Locale } from '../models/enums'

export default function About({ locale }: { locale: Locale }) {
  const content = siteContent[locale]
  const shared = siteContent.shared
  const galleryImages = [
    'suhov-photo.ru-355.jpg',
    'suhov-photo.ru-365.jpg',
    'suhov-photo.ru-395.jpg',
    'suhov-photo.ru-390.jpg',
    'suhov-photo.ru-368.jpg',
  ]

  return (
    <main className="mx-auto w-[min(calc(100%-2rem),80rem)] py-14 pb-24 md:w-[min(calc(100%-4rem),80rem)]">
      <section className="grid gap-8 border-b border-[#ceccc4] pb-14 md:grid-cols-[1.1fr_.9fr] md:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[.2em] text-gold uppercase">{content.aboutEyebrow}</p>
          <h1 className="font-display text-[clamp(3.25rem,8vw,6.5rem)] leading-[.92] text-[#20221e] uppercase">{content.aboutTitle}</h1>
        </div>
        <p className="max-w-xl text-base leading-[1.85] text-[#676863]">{content.aboutLead}</p>
      </section>

      <section className="grid gap-10 py-14 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p className="text-lg leading-[1.9] text-ink">{content.aboutBody}</p>
          <div className="mt-8 border-l-2 border-gold pl-5 text-sm leading-[1.8] text-ink-soft rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-5">{content.cards[0]?.title}</div>
        </div>
      </section>

      <section className="border-y border-line py-14">
        <h2 className="font-display text-4xl text-forest uppercase">{content.aboutGalleryTitle}</h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div key={image} className={`overflow-hidden bg-white ${index === 0 ? 'sm:row-span-2 lg:col-span-2' : ''}`}>
              <img src={`/Atika-Kadisha/images/gallery/${image}`} alt={`${content.aboutTitle} ${index + 1}`} className="h-full min-h-56 w-full object-cover transition duration-300 hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 bg-forest p-8 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <h2 className="font-display text-4xl text-gold-soft uppercase">{content.aboutContactTitle}</h2>
          <p className="mt-3 max-w-xl leading-7 text-paper/[.84]">{content.aboutContactText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${shared.contactPhone.replace(/-/g, '')}`} className="inline-flex items-center justify-center border border-gold px-5 py-3 text-sm text-gold-soft no-underline transition hover:bg-forest-2">{shared.contactPhone}</a>
          <Link to="/" className="inline-flex items-center justify-center bg-gold px-5 py-3 text-sm text-forest no-underline transition hover:bg-gold-soft">{content.ctaPrimary}</Link>
        </div>
      </section>
    </main>
  )
}
