"use client"

import { useLanguage } from "@/contexts/language-context"
import { CreditCard, Banknote, Coins, Building2 } from "lucide-react"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    title: "Accepted Payment Methods",
    subtitle: "Multiple payment options for your convenience",
    methods: [
      {
        name: "VISA",
        description: "Credit & Debit Cards",
        icon: CreditCard,
        bgImage: "/aryan-exchange-logo-square-without-bg.png"
      },
      {
        name: "SWIFT", 
        description: "International Bank Transfer",
        icon: Building2,
        bgImage: "/aryan-exchange-logo-1.jpg"
      },
      {
        name: "Crypto",
        description: "Digital Currencies",
        icon: Coins,
        bgImage: "/aryan-exchange-logo-2.jpg"
      },
      {
        name: "Cash",
        description: "Physical Currency",
        icon: Banknote,
        bgImage: "/aryan-exchange-table.jpg"
      }
    ]
  },
  fa: {
    title: "raveshe haye pardakht",
    subtitle: "chandin rahaye pardakht baraye rahat-e shoma",
    methods: [
      {
        name: "VISA",
        description: "kart haye credit & debit",
        icon: CreditCard,
        bgImage: "/aryan-exchange-logo-square-without-bg.png"
      },
      {
        name: "SWIFT",
        description: "enteghal vajeh beynolmelali",
        icon: Building2,
        bgImage: "/aryan-exchange-logo-1.jpg"
      },
      {
        name: "Crypto",
        description: "arz haye digital",
        icon: Coins,
        bgImage: "/aryan-exchange-logo-2.jpg"
      },
      {
        name: "nagdi",
        description: "arz fiziki",
        icon: Banknote,
        bgImage: "/aryan-exchange-table.jpg"
      }
    ]
  }
}

export function PaymentMethodsSection() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Modern Background Design */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>
      
      {/* Top and Bottom Borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4" style={fontStyle}>
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={fontStyle}>
            {t.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.methods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <div
                key={method.name}
                className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-card/40 via-card/30 to-card/20 backdrop-blur-lg transition-all duration-700 hover:border-gold/60 hover:shadow-[0_0_60px_rgba(201,162,39,0.4)] hover:scale-105 hover:rotate-1"
              >
                {/* Enhanced Background with Multiple Layers */}
                <div className="absolute inset-0">
                  {/* Base Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-amber-500/5 opacity-50" />
                  
                  {/* Image Background */}
                  <div className="absolute inset-0 opacity-8 group-hover:opacity-15 transition-all duration-700">
                    <img 
                      src={method.bgImage} 
                      alt="" 
                      className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
                  
                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                {/* Enhanced Content */}
                <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                  {/* Glowing Icon Container */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:via-gold/20 transition-all duration-700 border border-gold/30 group-hover:border-gold/50">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  
                  {/* Enhanced Typography */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent" style={fontStyle}>
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-700" style={fontStyle}>
                      {method.description}
                    </p>
                  </div>
                  
                  {/* Animated Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Enhanced Bottom Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-full border border-gold/30 backdrop-blur-sm hover:border-gold/50 transition-all duration-700 group">
            <div className="relative">
              <img src="/aryan-exchange-logo-square-without-bg.png" alt="Aryan Exchange" className="w-8 h-8 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent" style={fontStyle}>
              {language === "fa" ? "hamye rahaye pardakht ma amnist" : "All payment methods available"}
            </span>
          </div>
          
          {/* Additional Decorative Elements */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
