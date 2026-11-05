import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { invitationContent } from '../content/invitation'

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    document.documentElement.lang = locale === 'mr' ? 'mr' : 'en'
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: invitationContent[locale],
    }),
    [locale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
