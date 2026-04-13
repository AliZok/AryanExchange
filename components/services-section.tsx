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
import { PriceDisplay } from "@/components/price-display"

const services = {
  en: [
    {
      icon: Banknote,
      title: "Currency Exchange",
      description: "Exchange all major world currencies at competitive rates",
    },
    {
      icon: Bitcoin,
      title: "Cryptocurrency Trading",
      description: "Buy and sell Bitcoin, Ethereum, and all major digital currencies",
    },
    {
      icon: ArrowLeftRight,
      title: "Money Transfer",
      description: "Fast and secure international money transfers worldwide",
    },
    {
      icon: CreditCard,
      title: "VISA Card Services",
      description: "European VISA card services for seamless transactions",
    },
    {
      icon: Globe2,
      title: "SWIFT Transfers",
      description: "International wire transfers via SWIFT network",
    },
    {
      icon: Shield,
      title: "Secure Banking VPN",
      description: "Secure VPN solutions for banking applications",
    },
  ],
  fa: [
    {
      icon: Banknote,
      title: "تبدیل ارز",
      description: "تبدیل تمامی ارزهای معتبر جهانی با نرخ‌های رقابتی",
    },
    {
      icon: Bitcoin,
      title: "خرید و فروش ارز دیجیتال",
      description: "خرید و فروش بیت‌کوین، اتریوم و تمامی ارزهای دیجیتال معتبر",
    },
    {
      icon: ArrowLeftRight,
      title: "حواله ارزی",
      description: "انتقال سریع و امن پول به سراسر جهان",
    },
    {
      icon: CreditCard,
      title: "خدمات ویزا کارت",
      description: "خدمات ویزا کارت اروپایی برای تراکنش‌های بی‌دردسر",
    },
    {
      icon: Globe2,
      title: "انتقال سوئیفت",
      description: "انتقال حواله بین‌المللی از طریق شبکه سوئیفت",
    },
    {
      icon: Shield,
      title: "VPN بانکداری امن",
      description: "راه‌حل‌های VPN امن برای برنامه‌های بانکداری",
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

        {/* Price Display */}
        <div className="mb-16">
          <PriceDisplay />
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
