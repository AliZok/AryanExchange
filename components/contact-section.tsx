"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
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
      hours: "Mon-Fri: 10AM-9PM, Sat: 11AM-6PM",
      onlineSupport: "24/7 Online Support"
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
      hours: "شنبه تا پنج‌شنبه: ۱۰ صبح تا ۹ شب، شنبه: ۱۱ صبح تا ۶ عصر",
      onlineSupport: "پاخسگویی ۲۴ ساعته"
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
            style={fontStyle}
          >
            {t.description}
          </p>
          
          {/* Prominent WhatsApp Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                const cleanPhoneNumber = t.contactInfo.phone.replace(/[^0-9+]/g, '')
                const message = language === "fa" ? "slam, khastam az khedmatateton estefade konam" : "Hello, I'm interested in your services"
                const encodedMessage = encodeURIComponent(message)
                const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`
                window.open(whatsappUrl, '_blank')
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center gap-2"
              style={fontStyle}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {language === "fa" ? "chat dar WhatsApp" : "Chat on WhatsApp"}
            </button>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
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

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground" style={fontStyle}>
                    {t.contactInfo.onlineSupport}
                  </p>
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
