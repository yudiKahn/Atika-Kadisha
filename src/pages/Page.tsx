import { useState } from 'react'
import type { Locale } from '../models/enums'
import type { Product } from '../services/CatalogService'
import siteContent from '../content/siteContent.json'
import { useCart } from '../hooks/useCart'

interface PageProps { title: string; iconPath?: string; products: Product[]; headers: string[]; loading: boolean; error: string | null; locale: Locale }

function Page({ title, iconPath, products, headers, loading, error, locale }: PageProps) {
  const [sortBy, setSortBy] = useState('default')
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid')
  const { addToCart, getQuantity } = useCart()
  const content = siteContent[locale] as Record<string, any>
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '')
    const price = (item: Product) => parseFloat((item.price || '0').replace(/[^\d.]/g, '')) || 0
    return sortBy === 'price-asc' ? price(a) - price(b) : sortBy === 'price-desc' ? price(b) - price(a) : 0
  })
  const button = 'inline-flex items-center justify-center rounded border border-gold bg-forest px-4 py-2 text-xs tracking-wide text-gold-soft transition hover:bg-forest-2 disabled:cursor-not-allowed disabled:opacity-50'
  const empty = (message: string) => <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-ink-soft">{message}</div>

  return (
    <main className="mx-auto w-[min(calc(100%-2rem),80rem)] py-14 pb-24 md:w-[min(calc(100%-4rem),80rem)]">
      <section className="grid gap-6 border-b border-[#ceccc4] pb-14 md:grid-cols-2 md:items-end">
        <h1 className="flex items-center gap-3.5 font-display text-[clamp(3.25rem,8vw,6.5rem)] leading-[.92] text-[#20221e] uppercase">{iconPath && <img src={iconPath} alt="" className="h-[clamp(2.3rem,5vw,3.6rem)] w-[clamp(2.3rem,5vw,3.6rem)] object-contain" aria-hidden="true" />}<span>{title}</span></h1>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#dcdad2] py-3 text-[.8rem] tracking-[.08em]">
        <div className="flex items-center gap-4">
          {(['grid', 'table'] as const).map((layout) => <button key={layout} type="button" onClick={() => setViewLayout(layout)} title={layout === 'grid' ? content.layoutGrid : content.layoutTable} className={`flex items-center justify-center rounded p-2 transition ${viewLayout === layout ? 'bg-[#eeebe3] text-[#272823]' : 'text-[#92938d] hover:bg-[#eeebe3] hover:text-[#272823]'}`}><svg viewBox="0 0 24 24" className="h-4 w-4" fill={layout === 'grid' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">{layout === 'grid' ? <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" /> : <path d="M3 10h18M3 14h18M3 18h18M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2z" />}</svg></button>)}
          <span className="text-[#92938d]">{(content.itemsCount || '{count} items').replace('{count}', products.length.toString())}</span>
        </div>
        <label className="flex items-center gap-3"><span>{content.sortBy}</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="border-0 border-b border-[#bbbcb5] bg-transparent px-1 py-1 text-xs text-[#272823] outline-none"><option value="default">{content.sortDefault}</option><option value="price-asc">{content.sortPriceAsc}</option><option value="price-desc">{content.sortPriceDesc}</option><option value="name-asc">{content.sortNameAsc}</option></select></label>
      </section>

      {loading && empty(String(content.loading))}
      {error && !loading && <div className="flex flex-col items-center gap-4 py-20 text-[#8b3c32]"><svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg><p>{content.errorMsg}</p><button type="button" onClick={() => window.location.reload()} className={button}>{content.retryBtn}</button></div>}
      {!loading && !error && products.length === 0 && <div className="flex flex-col items-center gap-4 py-20 text-center text-ink-soft"><p>{content.emptyState}</p><div><p><strong>{content.columnsFound}</strong></p><div className="mt-3 flex flex-wrap justify-center gap-2">{headers.map((header) => <span key={header} className="rounded-full bg-[#eeebe3] px-3 py-1 text-xs">{header}</span>)}</div></div></div>}

      {!loading && !error && products.length > 0 && (viewLayout === 'grid' ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((item, index) => { const price = item.price || '0'; const displayPrice = /ils|nis|₪/i.test(price) ? price : `${price}.00 NIS`; return <article key={index} className="overflow-hidden border border-line bg-white shadow-card"><div className="flex h-56 items-center justify-center bg-white p-5">{item.image ? <img src={item.image} alt={item.name || 'Product'} className="h-full w-full object-contain" loading="lazy" /> : <div className="flex flex-col items-center gap-2 text-[#92938d]"><svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span className="text-xs">{content.noImage}</span></div>}</div><div className="bg-white p-5"><h3 className="text-lg text-forest">{item.name || content.unnamedItem}</h3><p className="mt-2 text-sm text-ink-soft">{displayPrice}</p><button type="button" className={`mt-5 w-full ${button}`} onClick={() => addToCart(item.id)} disabled={!item.id}>{item.id ? getQuantity(item.id) > 0 ? `${content.addToCart} (${getQuantity(item.id)})` : content.addToCart : content.unavailable}</button></div></article> })}
      </div> : <div className="mt-8 overflow-x-auto border border-line"><table className="w-full min-w-[42rem] border-collapse text-left text-sm rtl:text-right"><thead className="bg-[#eeebe3] text-xs tracking-wide text-ink-soft"><tr>{headers.map((header) => <th key={header} className="p-3">{header.toUpperCase()}</th>)}<th className="p-3">{content.cartColumn}</th></tr></thead><tbody>{sortedProducts.map((item, index) => <tr key={index} className="border-t border-line"><>{headers.map((header) => <td key={header} className="p-3">{header === 'image' ? item[header] ? <img src={item[header]} alt="Product thumb" className="h-14 w-14 object-contain" /> : <span className="text-xs text-ink-soft">{content.noImage}</span> : item[header] || ''}</td>)}</><td className="p-3"><button type="button" className={button} onClick={() => addToCart(item.id)} disabled={!item.id}>{item.id ? content.addToCart : content.unavailable}</button></td></tr>)}</tbody></table></div>)}
    </main>
  )
}

export default Page
