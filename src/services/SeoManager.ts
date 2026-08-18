import type { Locale } from '../models/enums'

type MetaFields = {
  title: string
  description: string
}

type LocalizedMeta = Record<Locale, MetaFields>

const SITE_BASE_PATH = '/Atika-Kadisha'

export class SeoManager {
  private static readonly pageMetaByPath: Record<string, LocalizedMeta> = {
    '/': {
      he: {
        title: 'עתיקא קדישא | סופר סת"ם ומוצרי סת"ם',
        description: 'עתיקא קדישא - מזוזות, תפילין, ספרי תורה ומגילות בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'Atika Kadisha | Sofer Stam and Judaica Products',
        description: 'Atika Kadisha offers mezuzot, tefillin, sifrei Torah and megillot under the management and supervision of Rabbi Efraim Kahn.',
      },
    },
    '/mezuza': {
      he: {
        title: 'מזוזות | עתיקא קדישא',
        description: 'מבחר מזוזות ומוצרי סת"ם באתר עתיקא קדישא, בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'Mezuzot | Atika Kadisha',
        description: 'Browse mezuzot and related Sofer Stam products from Atika Kadisha.',
      },
    },
    '/tefillin': {
      he: {
        title: 'תפילין | עתיקא קדישא',
        description: 'מבחר תפילין ומוצרי סת"ם באתר עתיקא קדישא, בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'Tefillin | Atika Kadisha',
        description: 'Browse tefillin and related Sofer Stam products from Atika Kadisha.',
      },
    },
    '/sefer-torah': {
      he: {
        title: 'ספר תורה | עתיקא קדישא',
        description: 'ספרי תורה ומוצרי סת"ם באתר עתיקא קדישא, בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'Sefer Torah | Atika Kadisha',
        description: 'Browse Sefer Torah offerings and related Sofer Stam products from Atika Kadisha.',
      },
    },
    '/megilla': {
      he: {
        title: 'מגילות | עתיקא קדישא',
        description: 'מגילות ומוצרי סת"ם באתר עתיקא קדישא, בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'Megillot | Atika Kadisha',
        description: 'Browse megillot and related Sofer Stam products from Atika Kadisha.',
      },
    },
    '/cart': {
      he: {
        title: 'עגלה | עתיקא קדישא',
        description: 'צפו במוצרים שנוספו לעגלה באתר עתיקא קדישא.',
      },
      en: {
        title: 'Cart | Atika Kadisha',
        description: 'Review the products added to your cart at Atika Kadisha.',
      },
    },
    '/about': {
      he: {
        title: 'אודות | עתיקא קדישא',
        description: 'אודות עתיקא קדישא, סופר סת״ם ומוצרי קדושה בהנהלת ובפיקוח הרב אפרים כהן.',
      },
      en: {
        title: 'About | Atika Kadisha',
        description: 'Learn about Atika Kadisha, our Sofer Stam services, supervision, and sacred products.',
      },
    },
  }

  private static readonly keywordsByLocale: Record<Locale, string> = {
    he: 'עתיקא קדישא, סופר סתם, סופר סת"ם, מוצרי סתם, מוצרי סת"ם, סופר, מזוזה, מזוזזה, תפילין, ספר תורה, מגילה, אפרים כהן, הרב אפרים כהן, אפרים כהן סופר סתם',
    en: 'Atika Kadisha, Sofer Stam, Judaica products, mezuzah, mezuzot, tefillin, sefer torah, megillah, Rabbi Efraim Kahn',
  }

  static apply(locale: Locale, pathname: string) {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/'
    const pageMeta = this.pageMetaByPath[normalizedPath] ?? this.pageMetaByPath['/']
    const localizedMeta = pageMeta[locale]
    const canonicalPath = `${SITE_BASE_PATH}${normalizedPath === '/' ? '/' : normalizedPath}`
    const canonicalUrl = `${window.location.origin}${canonicalPath}`

    document.title = localizedMeta.title
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr'

    this.setMeta('meta[name="description"]', 'content', localizedMeta.description)
    this.setMeta('meta[name="keywords"]', 'content', this.keywordsByLocale[locale])
    this.setMeta('meta[property="og:title"]', 'content', localizedMeta.title)
    this.setMeta('meta[property="og:description"]', 'content', localizedMeta.description)
    this.setMeta('meta[property="og:locale"]', 'content', locale === 'he' ? 'he_IL' : 'en_US')
    this.setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    this.setMeta('meta[name="twitter:title"]', 'content', localizedMeta.title)
    this.setMeta('meta[name="twitter:description"]', 'content', localizedMeta.description)
    this.setMeta('link[rel="canonical"]', 'href', canonicalUrl)
  }

  private static setMeta(selector: string, attribute: 'content' | 'href', value: string) {
    const element = document.querySelector(selector)
    if (element) {
      element.setAttribute(attribute, value)
    }
  }
}
