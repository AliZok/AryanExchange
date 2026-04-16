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
    monSat: "Mon - Fri",
    monSatTime: "10:00 AM - 9:00 PM",
    saturday: "Saturday",
    saturdayTime: "11:00 AM - 6:00 PM",
    onlineSupport: "24/7 Online Support",
    location: "Location",
    locationDesc: "Yerevan - 1 Yekmalyan St",
    phone: "Phone",
    phoneDesc: "+37493887915",
    email: "Email",
    emailDesc: "ArianExchange2026@gmail.com",
    paymentMethods: "Accepted Payment Methods",
  },
  fa: {
    title: "به ما سر بزنید",
    subtitle: "ساعات کاری و تماس",
    workingHours: "ساعات کاری",
    monSat: "شنبه تا پنج‌شنبه",
    monSatTime: "۱۰ صبح تا ۹ شب",
    saturday: "شنبه",
    saturdayTime: "۱۱ صبح تا ۶ عصر",
    onlineSupport: "پاسخگویی ۲۴ ساعته",
    location: "موقعیت",
    locationDesc: "ایروان - خیابان یکمالیان، شماره 1",
    phone: "تلفن",
    phoneDesc: "+۳۷۴ ۹۳۸ ۸۷۹۱۵",
    email: "ایمیل",
    emailDesc: "ArianExchange2026@gmail.com",
    paymentMethods: "روش‌های پرداخت",
  },
}

export function HoursSection() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section id="visit" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                <p className="text-gold font-medium" style={fontStyle}>{t.saturday}</p>
                <p className="text-muted-foreground" style={fontStyle}>{t.saturdayTime}</p>
              </div>
              <div>
                <p className="text-gold font-medium" style={fontStyle}>{t.onlineSupport}</p>
                <p className="text-muted-foreground" style={fontStyle}></p>
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
              <a 
                href="https://maps.app.goo.gl/6zazrfAyWswdSJez8?g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors cursor-pointer leading-relaxed block"
                style={fontStyle}
              >
                {t.locationDesc}
              </a>
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
              <a 
                href={`tel:+37493887915}`}
                dir="ltr"
                className="text-muted-foreground hover:text-gold transition-colors cursor-pointer block"
                style={fontStyle}
              >
                {t.phoneDesc}
              </a>
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
              <a 
                href={`mailto:${t.emailDesc}`}
                className="text-muted-foreground text-[14px] hover:text-gold transition-colors cursor-pointer block break-words"
                style={fontStyle}
              >
                {t.emailDesc}
              </a>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  )
}
