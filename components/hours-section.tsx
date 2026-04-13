"use client"

import { Clock, MapPin, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    title: "Visit Us",
    subtitle: "Working Hours & Contact",
    workingHours: "Working Hours",
    monSat: "Mon - Sat",
    monSatTime: "9:00 AM - 9:00 PM",
    sunday: "Sunday",
    sundayTime: "11:00 AM - 6:00 PM",
    location: "Location",
    locationDesc: "Visit our physical exchange for in-person transactions and consultations",
    phone: "Phone",
    phoneDesc: "Call us for inquiries and live rates",
    email: "Email",
    emailDesc: "Contact us anytime via email",
    paymentMethods: "Accepted Payment Methods",
  },
  fa: {
    title: "به ما سر بزنید",
    subtitle: "ساعات کاری و تماس",
    workingHours: "ساعات کاری",
    monSat: "شنبه تا پنج‌شنبه",
    monSatTime: "۹ صبح تا ۹ شب",
    sunday: "یکشنبه",
    sundayTime: "۱۱ صبح تا ۶ عصر",
    location: "موقعیت",
    locationDesc: "برای تراکنش‌های حضوری و مشاوره به صرافی ما مراجعه کنید",
    phone: "تلفن",
    phoneDesc: "برای استعلام و نرخ‌های لحظه‌ای با ما تماس بگیرید",
    email: "ایمیل",
    emailDesc: "هر زمان از طریق ایمیل با ما در تماس باشید",
    paymentMethods: "روش‌های پرداخت",
  },
}

export function HoursSection() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section id="contact" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gold mb-4"
            style={language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}}
          >
            {t.title}
          </h2>
          <p className="text-xl text-foreground/80" style={fontStyle}>
            {t.subtitle}
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Working Hours */}
          <Card className="bg-card/50 border-border/50 hover:border-gold/50 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <CardTitle className="text-lg text-foreground" style={fontStyle}>
                {t.workingHours}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-gold font-medium" style={fontStyle}>{t.monSat}</p>
                <p className="text-muted-foreground" style={fontStyle}>{t.monSatTime}</p>
              </div>
              <div>
                <p className="text-gold font-medium" style={fontStyle}>{t.sunday}</p>
                <p className="text-muted-foreground" style={fontStyle}>{t.sundayTime}</p>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-card/50 border-border/50 hover:border-gold/50 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <CardTitle className="text-lg text-foreground" style={fontStyle}>
                {t.location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed" style={fontStyle}>
                {t.locationDesc}
              </p>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-card/50 border-border/50 hover:border-gold/50 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <CardTitle className="text-lg text-foreground" style={fontStyle}>
                {t.phone}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" style={fontStyle}>
                {t.phoneDesc}
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-card/50 border-border/50 hover:border-gold/50 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <CardTitle className="text-lg text-foreground" style={fontStyle}>
                {t.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" style={fontStyle}>
                {t.emailDesc}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6" style={fontStyle}>{t.paymentMethods}</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="px-6 py-3 bg-card/50 rounded-lg border border-border/50">
              <span className="text-gold font-bold text-xl">VISA</span>
            </div>
            <div className="px-6 py-3 bg-card/50 rounded-lg border border-border/50">
              <span className="text-gold font-bold text-xl">SWIFT</span>
            </div>
            <div className="px-6 py-3 bg-card/50 rounded-lg border border-border/50">
              <span className="text-gold font-bold text-xl">Crypto</span>
            </div>
            <div className="px-6 py-3 bg-card/50 rounded-lg border border-border/50">
              <span className="text-gold font-bold text-xl" style={fontStyle}>{language === "fa" ? "نقدی" : "Cash"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
