"use client"

import { 
  Banknote, 
  Bitcoin, 
  CreditCard, 
  ArrowLeftRight, 
  Globe2, 
  Shield 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const services = {
  en: [
    {
      icon: ArrowLeftRight,
      title: "Direct Currency Transfer",
      description: "Fast and secure direct international currency transfers",
    },
    {
      icon: Bitcoin,
      title: "Professional Cryptocurrency Trading",
      description: "Expert buying and selling of all types of digital currencies",
    },
    {
      icon: CreditCard,
      title: "Foreign Income Cashing Services",
      description: "Cashing foreign currency income, VISA cards and SWIFT accounts",
    },
  ],
  fa: [
    {
      icon: ArrowLeftRight,
      title: "حواله مستقیم ارزی",
      description: "انتقال سریع و امن حواله مستقیم ارزی بین‌المللی",
    },
    {
      icon: Bitcoin,
      title: "خرید و فروش تخصصی انواع ارزهای دیجیتال",
      description: "خرید و فروش تخصصی و حرفه‌ای انواع ارزهای دیجیتال",
    },
    {
      icon: CreditCard,
      title: "نقد کردن درآمد ارزی، ویزاکارت و حساب‌های سوئیفت",
      description: "خدمات نقد کردن درآمدهای ارزی، ویزاکارت و حساب‌های سوئیفت",
    },
  ],
}

const sectionContent = {
  en: {
    title: "Our Services",
    subtitle: "What We Offer",
  },
  fa: {
    title: "خدمات ما",
    subtitle: "آنچه ارائه می‌دهیم",
  },
}

export function ServicesSection() {
  const { language } = useLanguage()
  const servicesList = services[language]
  const t = sectionContent[language]

  return (
    <section id="services" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gold mb-4"
            style={{ 
              fontFamily: language === "fa" 
                ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                : "inherit" 
            }}
          >
            {t.title}
          </h2>
          <p 
            className="text-xl text-foreground/80"
            style={{ 
              fontFamily: language === "fa" 
                ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                : "inherit" 
            }}
          >
            {t.subtitle}
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <Card 
              key={index}
              className="bg-card/50 border-border/50 hover:border-gold/50 transition-all duration-300 group backdrop-blur-sm"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <CardTitle 
                  className="text-xl text-foreground group-hover:text-gold transition-colors"
                  style={{ 
                    fontFamily: language === "fa" 
                      ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                      : "inherit" 
                  }}
                >
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription 
                  className="text-muted-foreground leading-relaxed"
                  style={{ 
                    fontFamily: language === "fa" 
                      ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                      : "inherit" 
                  }}
                >
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
