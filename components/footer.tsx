"use client"

import { Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Logo } from "@/components/logo"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    logo: "Aryan Exchange",
    tagline: "Your trusted partner for secure currency exchange and digital asset trading",
    copyright: "Aryan Exchange. All rights reserved.",
  },
  fa: {
    logo: "صرافی آرین",
    tagline: "شریک مورد اعتماد شما برای تبدیل ارز امن و معامله دارایی‌های دیجیتال",
    copyright: "صرافی آرین. تمامی حقوق محفوظ است.",
  },
}

export function Footer() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1 rounded-full border border-gold/30 bg-gold/10">
              <Logo size="md" />
            </div>
            <div>
              <h3 
                className="text-xl font-bold text-gold"
                style={language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}}
              >
                {t.logo}
              </h3>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md mb-8" style={fontStyle}>
            {t.tagline}
          </p>

          {/* Divider */}
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground" style={fontStyle}>
            © {new Date().getFullYear()} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
