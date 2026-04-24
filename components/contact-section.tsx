"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TelegramButton } from "@/components/telegram-button"
import { useLanguage } from "@/contexts/language-context"
import { supabase } from "@/supabase"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    title: "Visit Us",
    subtitle: "Working Hours & Contact",
    description: "Visit our exchange office in Yerevan for professional currency exchange and cryptocurrency trading services.",
    contactInfo: {
      email: "ArianExchange2026@gmail.com",
      phone: "+37493887915",
      address: "Yerevan - 1 Yekmalyan St",
      hours: "Mon-Fri: 10:00 AM - 9:00 PM, Saturday: 11:00 AM - 6:00 PM",
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
    title: "به ما سر بزنید",
    subtitle: "ساعات کاری و تماس",
    description: "دفاتر صرافی آرین در ایروان برای خدمات تبادل ارز و ارزهای دیجیتال آماده خدمت‌رسانی به شما عزیزان می‌باشد.",
    contactInfo: {
      email: "ArianExchange2026@gmail.com",
      phone: "+37493887915",
      address: "ایروان - خیابان یکمالیان، شماره 1",
      hours: "دوشنبه تا جمعه۱۰ تا ۲۱ و شنبه ۱۱ تا ۱۸",
      onlineSupport: "پاسخگویی ۲۴ ساعته"
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
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'unread',
          created_at: new Date().toISOString()
        })

      if (error) {
        throw error
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      setSubmitMessage(language === "fa" ? "پیام شما با موفقیت ارسال شد!" : "Your message has been sent successfully!")
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage(language === "fa" ? "خطا در ارسال پیام. لطفاً دوباره تلاش کنید." : "Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  style={fontStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" style={fontStyle}>
                  {t.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                  style={fontStyle}
                />
              </div>

              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitMessage.includes('موفقیت') || submitMessage.includes('successfully')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="py-5 w-full bg-gold hover:bg-gold-dark text-navy font-semibold disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting 
                  ? (language === "fa" ? "در حال ارسال..." : "Sending...")
                  : t.form.submit
                }
              </Button>
            </form>
          </div>
        </div>
        
        {/* WhatsApp and Telegram Buttons at Bottom */}
        <div className="mt-12 text-center">
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WhatsAppButton 
              phoneNumber={t.contactInfo.phone}
              message={language === "fa" ? "سلام، می خواستم از خدمات شما استفاده کنم" : "Hello, I'm interested in your services"}
              className="px-8 py-3 text-lg"
            />
            <TelegramButton 
              username="ArianExchangee"
              message={language === "fa" ? "سلام، می خواستم از خدمات شما استفاده کنم" : "Hello, I'm interested in your services"}
              className="px-8 py-3 text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
