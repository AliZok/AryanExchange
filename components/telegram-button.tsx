"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const IRAN_SANS_FONT = "'IranSans', 'Tahoma', 'Arial', sans-serif"

const content = {
  en: {
    buttonText: "Chat on Telegram",
    ariaLabel: "Chat with us on Telegram"
  },
  fa: {
    buttonText: "پیام در تلگرام",
    ariaLabel: "Chat with us on Telegram"
  }
}

interface TelegramButtonProps {
  username?: string
  message?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function TelegramButton({ 
  username, 
  message = "Hello, I'm interested in your services", 
  className = "",
  variant = "default",
  size = "default"
}: TelegramButtonProps) {
  const { language } = useLanguage()
  const t = content[language]
  const fontStyle = language === "fa" ? { fontFamily: IRAN_SANS_FONT } : {}

  const handleTelegramClick = () => {
    const cleanUsername = username ? username.replace(/@/g, '') : 'ArianExchangee'
    const encodedMessage = encodeURIComponent(message)
    const telegramUrl = `https://t.me/${cleanUsername}?text=${encodedMessage}`
    window.open(telegramUrl, '_blank')
  }

  return (
    <Button
      onClick={handleTelegramClick}
      variant={variant}
      size={size}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors cursor-pointer ${className}`}
      aria-label={t.ariaLabel}
      style={fontStyle}
    >
      <Send className="w-4 h-4 mr-2" />
      {t.buttonText}
    </Button>
  )
}
