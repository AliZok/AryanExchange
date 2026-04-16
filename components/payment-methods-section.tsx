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
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/aryan-exchange-logo-square-without-bg.png')] bg-repeat" style={{ backgroundSize: '200px 200px' }} />
      </div>
      
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
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] hover:scale-105"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img 
                    src={method.bgImage} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gold mb-2" style={fontStyle}>
                    {method.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground" style={fontStyle}>
                    {method.description}
                  </p>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Bottom Decorative Element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 rounded-full border border-gold/30">
            <img src="/aryan-exchange-logo-square-without-bg.png" alt="Aryan Exchange" className="w-6 h-6" />
            <span className="text-sm text-gold font-medium" style={fontStyle}>
              {language === "fa" ? "hamye rahaye pardakht ma amnist" : "All payment methods available"}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
