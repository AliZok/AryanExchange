"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    buttonText: "Chat on WhatsApp",
    ariaLabel: "Chat with us on WhatsApp"
  },
  fa: {
    buttonText: "چت در واتس‌اپ",
    ariaLabel: "Chat with us on WhatsApp"
  }
}

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function WhatsAppButton({ 
  phoneNumber, 
  message = "Hello, I'm interested in your services", 
  className = "",
  variant = "default",
  size = "default"
}: WhatsAppButtonProps) {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  const handleWhatsAppClick = () => {
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9+]/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white font-medium transition-colors ${className}`}
      aria-label={t.ariaLabel}
      style={fontStyle}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {t.buttonText}
    </Button>
  )
}
