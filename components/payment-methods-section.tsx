"use client"

import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    title: "Accepted Payment Methods",
    methods: ["VISA", "SWIFT", "Crypto", "Cash"]
  },
  fa: {
    title: "raveshe haye pardakht",
    methods: ["VISA", "SWIFT", "Crypto", "nagdi"]
  }
}

export function PaymentMethodsSection() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section className="py-16 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-8 text-lg" style={fontStyle}>{t.title}</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="px-8 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-gold/50 transition-all duration-300">
              <span className="text-gold font-bold text-2xl">{t.methods[0]}</span>
            </div>
            <div className="px-8 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-gold/50 transition-all duration-300">
              <span className="text-gold font-bold text-2xl">{t.methods[1]}</span>
            </div>
            <div className="px-8 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-gold/50 transition-all duration-300">
              <span className="text-gold font-bold text-2xl">{t.methods[2]}</span>
            </div>
            <div className="px-8 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-gold/50 transition-all duration-300">
              <span className="text-gold font-bold text-2xl" style={fontStyle}>{t.methods[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
