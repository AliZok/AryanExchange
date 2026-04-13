"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const features = {
  en: [
    "Licensed and regulated exchange",
    "Competitive exchange rates",
    "Fast and secure transactions",
    "Professional customer service",
    "Wide range of currencies",
    "Cryptocurrency expertise",
  ],
  fa: [
    "صرافی دارای مجوز و تحت نظارت",
    "نرخ‌های رقابتی تبدیل ارز",
    "تراکنش‌های سریع و امن",
    "خدمات حرفه‌ای مشتریان",
    "طیف گسترده‌ای از ارزها",
    "تخصص در ارزهای دیجیتال",
  ],
}

const content = {
  en: {
    title: "About Aryan Exchange",
    subtitle: "Who We Are",
    description: "Aryan Exchange is your trusted partner for all currency and digital asset needs. With years of experience in the financial industry, we provide reliable, secure, and efficient services for currency exchange, cryptocurrency trading, and international money transfers.",
    stat1: "Years Experience",
    stat2: "Currencies",
    stat3: "Support",
  },
  fa: {
    title: "درباره صرافی آرین",
    subtitle: "ما که هستیم",
    description: "صرافی آرین شریک مورد اعتماد شما برای تمامی نیازهای ارزی و دارایی دیجیتال است. با سال‌ها تجربه در صنعت مالی، ما خدمات قابل اعتماد، امن و کارآمد برای تبدیل ارز، معامله ارزهای دیجیتال و انتقال پول بین‌المللی ارائه می‌دهیم.",
    stat1: "سال تجربه",
    stat2: "نوع ارز",
    stat3: "پشتیبانی",
  },
}

export function AboutSection() {
  const { language, isRTL } = useLanguage()
  const featuresList = features[language]
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "lg:grid-flow-dense" : ""}`}>
          {/* Image */}
          <div className={`relative ${isRTL ? "lg:col-start-2" : ""}`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-gold/5 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/30">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aryan2-3z1qWPX3raFAODpA5AEvTm0PkChVsz.jpg"
                alt="Aryan Exchange - Global Currency Services"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className={isRTL ? "lg:col-start-1" : ""}>
            <h2 
              className="text-4xl md:text-5xl font-bold text-gold mb-4"
              style={language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}}
            >
              {t.title}
            </h2>
            <p className="text-xl text-foreground/80 mb-8" style={fontStyle}>
              {t.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8" style={fontStyle}>
              {t.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {featuresList.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-foreground/90" style={fontStyle}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">+10</div>
                <div className="text-sm text-muted-foreground" style={fontStyle}>{t.stat1}</div>
              </div>
              <div className="text-center border-x border-border/50">
                <div className="text-3xl font-bold text-gold">+50</div>
                <div className="text-sm text-muted-foreground" style={fontStyle}>{t.stat2}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">24/7</div>
                <div className="text-sm text-muted-foreground" style={fontStyle}>{t.stat3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
