"use client"

import { useState } from "react"
import { Shield, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

const navLinks = {
  en: [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#visit", label: "Visit Us" },
  ],
  fa: [
    { href: "#services", label: "خدمات" },
    { href: "#about", label: "درباره ما" },
    { href: "#visit", label: "به ما سر بزنید" },
  ],
}

const content = {
  en: {
    logo: "Aryan Exchange",
    cta: "Call Us",
  },
  fa: {
    logo: "صرافی آرین",
    cta: "تماس با ما",
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const links = navLinks[language]
  const t = content[language]

  const handleCall = () => {
    window.location.href = "tel:+37493887915"
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId.replace('#', ''))
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu if open
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg border border-gold/30 bg-gold/10 overflow-hidden">
              <Image
                src="/aryan-exchange-logo-2.jpg"
                alt="Aryan Exchange Logo"
                fill
                className="object-cover"
                priority
                style={{ objectFit: 'cover' }}
              />
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
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-foreground/80 hover:text-gold transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle />
            <Button 
              onClick={handleCall}
              className="bg-gold hover:bg-gold-dark text-navy font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
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
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-foreground/80 hover:text-gold transition-colors py-2 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                onClick={handleCall}
                className="bg-gold hover:bg-gold-dark text-navy font-semibold w-full mt-2 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t.cta}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
