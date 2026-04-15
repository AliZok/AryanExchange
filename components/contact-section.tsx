"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    description: "Have questions about our services? Want to exchange currency or trade cryptocurrency? Reach out to us and we'll be happy to assist you.",
    contactInfo: {
      email: "ArianExchange2026@gmail.com",
      phone: "+374 93 887915",
      address: "Yerevan - 1 Yekmalyan St",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    form: {
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      submit: "Send Message"
    }
  },
  fa: {
    title: "تماس با ما",
    subtitle: "ارتباط با آرین",
    description: "سوالاتی در مورد خدمات ما دارید؟ می‌خواهید ارز را تبدیل کنید یا با ارزهای دیجیتال معامله کنید؟ با ما تماس بگیرید و خوشحال خواهیم شد که به شما کمک کنیم.",
    contactInfo: {
      email: "ArianExchange2026@gmail.com",
      phone: "+۳۷۴ ۹۳ ۸۸۷۹۱۵",
      address: "منطقه مالی ۱۲۳، نیویورک، نیویورک ۱۰۰۰۴",
      hours: "دوشنبه تا جمعه: ۹ صبح تا ۶ عصر، شنبه: ۱۰ صبح تا ۴ عصر"
    },
    form: {
      name: "نام کامل",
      email: "آدرس ایمیل",
      subject: "موضوع",
      message: "پیام",
      submit: "ارسال پیام"
    }
  }
}

export function ContactSection() {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  return (
    <section id="contact" className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gold mb-4"
            style={fontStyle}
          >
            {t.title}
          </h2>
          <p 
            className="text-xl text-foreground/80 mb-4"
            style={fontStyle}
          >
            {t.subtitle}
          </p>
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            style={fontStyle}
          >
            {t.description}
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 
              className="text-2xl font-semibold text-gold mb-6"
              style={fontStyle}
            >
              {language === "fa" ? "اطلاعات تماس" : "Contact Information"}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={fontStyle}>
                    {language === "fa" ? "ایمیل" : "Email"}
                  </p>
                  <a 
                    href={`mailto:${t.contactInfo.email}`}
                    className="text-muted-foreground hover:text-gold transition-colors cursor-pointer break-words"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = `mailto:${t.contactInfo.email}`
                    }}
                  >
                    {t.contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={fontStyle}>
                    {language === "fa" ? "تلفن" : "Phone"}
                  </p>
                  <a 
                    href={`tel:${t.contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = `tel:${t.contactInfo.phone.replace(/[^0-9+]/g, '')}`
                    }}
                  >
                    {t.contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={fontStyle}>
                    {language === "fa" ? "آدرس" : "Address"}
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/6zazrfAyWswdSJez8?g_st=awb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                  >
                    {t.contactInfo.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={fontStyle}>
                    {language === "fa" ? "ساعات کاری" : "Business Hours"}
                  </p>
                  <p className="text-muted-foreground">{t.contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-8">
            <h3 
              className="text-2xl font-semibold text-gold mb-6"
              style={fontStyle}
            >
              {language === "fa" ? "ارسال پیام" : "Send us a Message"}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  style={fontStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.email}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  style={fontStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  style={fontStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.message}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                  style={fontStyle}
                />
              </div>

              <Button className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold">
                {t.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
