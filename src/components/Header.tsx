import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import { useCart } from '../hooks/useCart'
import type { Locale } from '../models/enums'
import { getNavigationIcon } from '../utils/navigationIcons'

function Header({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (value: Locale) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const content = siteContent[locale]
  const { count } = useCart()
  const menuContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (menuContainerRef.current && event.target instanceof Node && !menuContainerRef.current.contains(event.target)) setIsMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isMenuOpen])

  const focusClass = 'focus-visible:outline-2 focus-visible:outline-[#5b6651] focus-visible:outline-offset-3'
  const localeClass = (active: boolean) => `cursor-pointer border-0 bg-transparent p-0 text-[.65rem] tracking-[.08em] ${active ? 'text-forest' : 'text-[#999a94]'} ${focusClass}`

  return (
    <header className="sticky top-0 z-[70] border-b border-line/60 bg-cream/[.94] backdrop-blur-xl">
      <div className="relative mx-auto grid min-h-21 w-[min(calc(100%-2rem),88rem)] grid-cols-[1fr_auto_1fr] items-center md:w-[min(calc(100%-4rem),88rem)] lg:flex lg:min-h-22 lg:justify-between">
        <div className="relative justify-self-start lg:hidden" ref={menuContainerRef}>
          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cfcdc5] bg-transparent text-forest transition hover:border-gold hover:bg-card ${focusClass}`} aria-label={content.menuAria}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 top-13 z-[80] w-56 border border-line bg-card p-3 shadow-[0_1.5rem_3rem_rgb(40_42_36_/_12%)] rtl:right-0 rtl:left-auto">
              {content.menuLinks.map((link: { label: string; path: string }) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-2.5 p-3 text-xs tracking-wide text-ink no-underline transition hover:bg-cream-2 ${focusClass}`}>
                  {getNavigationIcon(link.path) && <img src={getNavigationIcon(link.path)} alt="" className="h-6 w-6 object-contain" aria-hidden="true" />}
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-[#dedcd5] pt-3">
                {(['en', 'he'] as Locale[]).map((value) => <button key={value} type="button" onClick={() => onLocaleChange(value)} className={`flex-1 border px-3 py-2 text-[.7rem] tracking-[.1em] ${locale === value ? 'border-forest bg-forest text-white' : 'border-[#d6d4cd] bg-transparent text-[#686962]'} ${focusClass}`}>{value === 'en' ? 'EN' : 'עב'}</button>)}
              </div>
            </div>
          )}
        </div>

        <Link to="/" className={`font-display text-[clamp(2rem,6vw,3.35rem)] leading-none text-forest no-underline uppercase lg:min-w-56 lg:text-[3.2rem] ${focusClass}`}>{content.brandName}</Link>

        <nav className="hidden items-center gap-[clamp(1.25rem,2.2vw,2.25rem)] lg:flex" aria-label="Primary navigation">
          {content.menuLinks.map((link: { label: string; path: string }) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `relative inline-flex items-center gap-2 py-8 text-[.7rem] font-medium tracking-[.1em] no-underline uppercase transition after:absolute after:bottom-[1.65rem] after:left-0 after:right-0 after:h-px after:bg-gold after:transition-transform ${isActive ? 'text-forest after:scale-x-100' : 'text-ink-soft after:scale-x-0 hover:text-forest hover:after:scale-x-100'} ${focusClass}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-self-end lg:min-w-40 lg:justify-end lg:gap-5">
          <div className="hidden items-center gap-1 text-[#aaa9a2] lg:flex" aria-label={content.localeLabel}>
            <button type="button" onClick={() => onLocaleChange('en')} className={localeClass(locale === 'en')}>EN</button><span>/</span><button type="button" onClick={() => onLocaleChange('he')} className={localeClass(locale === 'he')}>עב</button>
          </div>
          <Link to="/cart" className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cfcdc5] text-forest transition hover:border-gold hover:bg-card ${focusClass}`} aria-label={content.cartAria}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h2l2.3 9.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L17 6H7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="19" r="1.25" fill="currentColor" stroke="none" /><circle cx="17" cy="19" r="1.25" fill="currentColor" stroke="none" /></svg>
            {count > 0 && <span className="absolute -right-1 -top-1 min-w-4.5 rounded-full bg-forest px-1 text-center text-[.65rem] leading-4.5 text-white">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
