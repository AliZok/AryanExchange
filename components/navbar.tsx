"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

const navLinks = {
  en: [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  fa: [
    { href: "#services", label: "خدمات" },
    { href: "#about", label: "درباره ما" },
    { href: "#contact", label: "تماس" },
  ],
}

const content = {
  en: {
    logo: "Aryan Exchange",
    cta: "Get Rates",
  },
  fa: {
    logo: "صرافی آرین",
    cta: "دریافت نرخ",
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const links = navLinks[language]
  const t = content[language]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg border border-gold/30 bg-gold/10">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <span 
              className="text-lg font-bold text-gold"
              style={{ 
                fontFamily: language === "fa" 
                  ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                  : "inherit" 
              }}
            >
              {t.logo}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle />
            <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold">
              {t.cta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-gold transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold w-full mt-2">
                {t.cta}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
