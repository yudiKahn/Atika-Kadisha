import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import siteContent from './content/siteContent.json'
import seferImage from './assets/sefer.png'
import type { Locale } from './models/enums'
import { SeoManager } from './services/SeoManager'
import Mezuza from './pages/Mezuza'
import Tefillin from './pages/Tefillin'
import SeferTorah from './pages/SeferTorah'
import Megilla from './pages/Megilla'
import Cart from './pages/Cart'
import About from './pages/About'
import { getNavigationIcon } from './utils/navigationIcons'

function AppContent({ locale, setLocale }: { locale: Locale; setLocale: (value: Locale) => void }) {
  const location = useLocation()
  const content = siteContent[locale]
  const sharedContent = siteContent.shared
  const homeLinks = [...content.menuLinks, { label: content.cartTitle, path: '/cart' }]
  const categoryLinks = content.menuLinks.filter((link) =>
    ['/sefer-torah', '/mezuza', '/tefillin', '/megilla'].includes(link.path)
  )
  const scrollToCategories = () => {
    document.getElementById('home-category-grid')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    SeoManager.apply(locale, location.pathname)
  }, [locale, location.pathname])

  return (
    <div className="min-h-screen bg-cream text-ink" dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <Header locale={locale} onLocaleChange={setLocale} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="flex flex-col">
              <section className="relative flex min-h-[clamp(28rem,54vw,42rem)] overflow-hidden bg-forest">
                <img
                  src={seferImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-right"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_17_12_/_88%)_0%,rgb(10_17_12_/_66%)_34%,rgb(10_17_12_/_8%)_72%),linear-gradient(0deg,rgb(10_17_12_/_18%),rgb(10_17_12_/_18%))] rtl:bg-[linear-gradient(270deg,rgb(10_17_12_/_88%)_0%,rgb(10_17_12_/_66%)_34%,rgb(10_17_12_/_8%)_72%),linear-gradient(0deg,rgb(10_17_12_/_18%),rgb(10_17_12_/_18%))]"
                  role="img"
                  aria-label={content.brandName}
                >
                  <div className="relative z-10 mx-auto flex min-h-[clamp(28rem,54vw,42rem)] w-[min(calc(100%-2rem),80rem)] flex-1 flex-col items-start py-12 md:w-[min(calc(100%-4rem),80rem)] md:py-16">
                    <h2 className="font-display text-[clamp(3.7rem,10vw,7rem)] leading-[.95] text-paper uppercase">{content.brandName}</h2>
                    <p className="mt-6 max-w-[29rem] text-[1.02rem] leading-[1.85] text-paper/88">{content.cards[0]?.title}</p>
                    <button type="button" className="mt-auto inline-flex max-w-1/2 min-w-68 items-center justify-center gap-3.5 self-start rounded-lg border border-gold bg-forest px-5 py-4 text-[1.05rem] font-semibold text-gold-soft shadow-[0_.8rem_2.2rem_rgb(0_0_0_/_18%)] transition hover:-translate-y-px hover:bg-forest-2" onClick={scrollToCategories}>
                      {content.ctaPrimary}
                      <span aria-hidden="true">&larr;</span>
                    </button>
                  </div>
                </div>
              </section>

              <section id="home-category-grid" className="mx-auto mt-9 grid w-[min(calc(100%-2rem),80rem)] scroll-mt-25 gap-4 sm:grid-cols-2 lg:w-[min(calc(100%-4rem),80rem)] xl:grid-cols-4" aria-label={content.homeCategoryAria}>
                {categoryLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="flex min-h-49 flex-col items-center justify-center rounded-lg border border-line bg-card px-4 py-5 text-center text-ink no-underline shadow-card transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_1rem_2.4rem_rgb(34_28_18_/_14%)]">
                    {getNavigationIcon(link.path) && (
                      <img src={getNavigationIcon(link.path)} alt="" className="h-16 w-16 object-contain [filter:sepia(1)_saturate(.3)_hue-rotate(80deg)_brightness(.45)]" aria-hidden="true" />
                    )}
                    <h3 className="mt-3 text-[1.22rem] leading-tight text-forest">{link.label}</h3>
                    <span className="mt-2 text-[1.65rem] leading-none text-gold" aria-hidden="true">&larr;</span>
                  </Link>
                ))}
              </section>




              <section className="mx-auto mt-11 grid w-[min(calc(100%-2rem),80rem)] border-t border-line md:grid-cols-3 lg:w-[min(calc(100%-4rem),80rem)]">
                {content.cards.map((item: { title: string; text: string }) => (
                  <article key={item.title} className="relative border-b border-line py-8 first:before:absolute first:before:left-0 first:before:top-[-1px] first:before:h-0.5 first:before:w-11 first:before:bg-gold md:px-8 md:first:pl-0 md:last:border-r-0 md:[&:not(:last-child)]:border-r md:[&:not(:first-child)]:before:hidden">
                    <h3 className="text-[1.45rem] font-normal text-forest">{item.title}</h3>
                    <p className="mt-3 max-w-80 text-[.84rem] leading-[1.75] text-ink-soft">{item.text}</p>
                  </article>
                ))}
              </section>

              <footer className="mt-1 grid gap-8 bg-forest px-4 py-13 text-paper/[.84] md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-[max(1rem,calc((100%-80rem)/2))]">
                <div>
                  <p className="font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-none text-paper uppercase">{content.brandName}</p>
                  <span className="mt-3 block text-gold-soft">{content.brandSubtitle}</span>
                </div>
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gold-soft">{content.homeFooterQuickLinksTitle}</h3>
                  {homeLinks.filter((link) => link.path.length > 1).slice(0, 5).map((link) => (
                    <Link key={link.path} to={link.path} className="mt-2 block text-inherit no-underline transition hover:text-gold-soft">{link.label}</Link>
                  ))}
                </div>
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gold-soft">{content.homeFooterContactTitle}</h3>
                  <a className="mt-2 block text-inherit no-underline transition hover:text-gold-soft" href={`tel:${sharedContent.contactPhone.replace(/-/g, '')}`}>{sharedContent.contactPhone}</a>
                  <a className="mt-2 block text-inherit no-underline transition hover:text-gold-soft" href={`mailto:${sharedContent.contactEmail}`}>{sharedContent.contactEmail}</a>
                  <span className="mt-2 block">{content.homeFooterLocation}</span>
                </div>
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gold-soft">{content.homeFooterHoursTitle}</h3>
                  {content.homeFooterHours.map((hours) => (
                    <span key={hours} className="mt-2 block">{hours}</span>
                  ))}
                </div>
              </footer>
            </main>
          }
        />
        <Route path="/mezuza" element={<Mezuza locale={locale} />} />
        <Route path="/tefillin" element={<Tefillin locale={locale} />} />
        <Route path="/sefer-torah" element={<SeferTorah locale={locale} />} />
        <Route path="/megilla" element={<Megilla locale={locale} />} />
        <Route path="/cart" element={<Cart locale={locale} />} />
        <Route path="/about" element={<About locale={locale} />} />
      </Routes>

      <a
        href={sharedContent.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] flex h-13 w-13 items-center justify-center rounded-full border border-white/[.45] bg-ink text-white shadow-[0_.75rem_2rem_rgb(34_53_41_/_18%)] transition hover:-translate-y-0.5 hover:bg-[#304f3b] focus-visible:outline-2 focus-visible:outline-[#354432] focus-visible:outline-offset-4"
        aria-label={content.whatsappAria}
      >
        <svg viewBox="0 0 30 30" className="m-2 h-full w-full" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
        </svg>
      </a>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>('he')

  return (
    <BrowserRouter basename="/Atika-Kadisha/">
      <AppContent locale={locale} setLocale={setLocale} />
    </BrowserRouter>
  )
}

export default App
