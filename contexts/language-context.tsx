"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "fa"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const isRTL = language === "fa"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      <div 
        dir={isRTL ? "rtl" : "ltr"} 
        style={{ 
          fontFamily: isRTL 
            ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
            : "var(--font-sans)" 
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
