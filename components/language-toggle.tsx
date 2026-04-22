"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "fa" : "en")}
      className="border-gold/50 bg-gold/10 hover:bg-gold/20 text-gold hover:text-gold gap-2 font-medium cursor-pointer"
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">
        {language === "en" ? "Fa" : "En"}
      </span>
      <span className="sm:hidden">
        {language === "en" ? "FA" : "EN"}
      </span>
    </Button>
  )
}
