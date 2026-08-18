import { Link } from 'react-router-dom'
import siteContent from '../content/siteContent.json'
import { useCart } from '../hooks/useCart'
import { useCatalog } from '../hooks/useCatalog'
import type { Locale } from '../models/enums'

export default function Cart({ locale }: { locale: Locale }) {
  const content = siteContent[locale] as Record<string, unknown>
  const { products, loading } = useCatalog()
  const { items, count, updateQuantity, removeFromCart, clearCart } = useCart()
  const cartEntries = Object.entries(items).map(([productId, quantity]) => ({ productId, quantity, product: products.find((entry) => entry.id === productId) })).filter((entry) => entry.product)
  const button = 'inline-flex items-center justify-center rounded border border-gold bg-forest px-4 py-2 text-xs tracking-wide text-gold-soft transition hover:bg-forest-2'
  const totalItemsText = String(content.cartItemsCount || '{count} items in cart').replace('{count}', count.toString())

  return <main className="mx-auto w-[min(calc(100%-2rem),80rem)] py-14 pb-24 md:w-[min(calc(100%-4rem),80rem)]">
    <section className="grid gap-6 border-b border-[#ceccc4] pb-14 md:grid-cols-2 md:items-end"><h1 className="font-display text-[clamp(3.25rem,8vw,6.5rem)] leading-[.92] text-[#20221e] uppercase">{String(content.cartTitle)}</h1><p className="text-[#676863]">{totalItemsText}</p></section>
    {loading && cartEntries.length === 0 ? <div className="flex flex-col items-center gap-4 py-20 text-ink-soft"><span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest" /><p>{String(content.loading)}</p></div> : count === 0 ? <div className="flex flex-col items-center gap-5 py-20 text-center text-ink-soft"><p>{String(content.cartEmpty)}</p><Link to="/" className={button}>{String(content.cartContinueShopping)}</Link></div> : <section className="mt-8"><div className="flex justify-end"><button type="button" onClick={clearCart} className="border-0 bg-transparent px-2 py-2 text-xs text-[#777873] underline transition hover:text-forest">{String(content.cartClear)}</button></div><div className="mt-3 grid gap-4">{cartEntries.map(({ productId, quantity, product }) => product && <article key={productId} className="grid gap-5 border-b border-line py-5 sm:grid-cols-[10rem_1fr]"><div className="flex h-40 items-center justify-center bg-[#f1eadf] p-4">{product.image ? <img src={product.image} alt={product.name || String(content.unnamedItem)} className="h-full w-full object-contain" /> : <span className="text-xs text-ink-soft">{String(content.noImage)}</span>}</div><div className="flex flex-col justify-between gap-5"><div><h2 className="text-xl text-forest">{product.name || String(content.unnamedItem)}</h2><p className="mt-2 text-sm text-ink-soft">{product.price || ''}</p></div><div className="flex flex-wrap items-end gap-5"><label className="flex flex-col gap-1 text-xs text-ink-soft"><span>{String(content.cartQuantity)}</span><input type="number" min="1" value={quantity} onChange={(event) => updateQuantity(productId, Number(event.target.value))} className="w-20 border border-line bg-card px-2 py-2 text-ink outline-none focus:border-gold" /></label><button type="button" onClick={() => removeFromCart(productId)} className="border-0 bg-transparent px-0 py-2 text-xs text-[#777873] underline hover:text-forest">{String(content.cartRemove)}</button></div></div></article>)}</div></section>}
  </main>
}
