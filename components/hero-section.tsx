"use client"

import { Shield, Globe, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useRef } from "react"
import { Logo } from "@/components/logo"

const content = {
  en: {
    title: "Aryan Exchange",
    tagline: "Your trusted partner for currency exchange, digital assets trading, and international money transfers",
    cta1: "Contact Us",
    cta2: "Our Services",
    badge1: "Secure Transactions",
    badge2: "Global Network",
    badge3: "Licensed Exchange",
  },
  fa: {
    title: "صرافی آرین",
    tagline: "صرافی و شرکت خدماتی و توریستی آرین",
    cta1: "تماس با ما",
    cta2: "خدمات ما",
    badge1: "تراکنش‌های امن",
    badge2: "شبکه جهانی",
    badge3: "صرافی دارای مجوز",
  },
}

// Matrix rain characters
const matrixChars = "01$¥€£₿"

export function HeroSection() {
  const { language, isRTL } = useLanguage()
  const t = content[language]
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number | null = null
    let intervalId: NodeJS.Timeout | null = null

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(6, 13, 24, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gold/amber color for matrix characters
      ctx.fillStyle = "rgba(201, 162, 39, 0.6)"
      ctx.font = "15px monospace"

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        const x = i * 20
        const y = drops[i] * 20

        // Gradient effect - brighter at the head
        const gradient = ctx.createLinearGradient(x, y - 100, x, y)
        gradient.addColorStop(0, "rgba(201, 162, 39, 0)")
        gradient.addColorStop(0.8, "rgba(201, 162, 39, 0.3)")
        gradient.addColorStop(1, "rgba(212, 175, 55, 0.8)")
        ctx.fillStyle = gradient

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    intervalId = setInterval(draw, 50)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener("resize", resizeCanvas)
      
      // Clear canvas to prevent memory leaks
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060d18]">
      {/* Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Galaxy/Space Background Elements */}
      <div className="absolute inset-0 z-[1]">
        {/* Nebula gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#09111d]/90 via-transparent to-[#1a0a28]/30" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[200px]" />
        
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent rotate-[35deg] animate-shooting-star" />
        <div className="absolute top-[40%] right-[20%] w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rotate-[25deg] animate-shooting-star-delayed" />
        
        {/* Horizontal scan lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(201, 162, 39, 0.1) 2px,
              rgba(201, 162, 39, 0.1) 4px
            )`,
          }}
        />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,13,24,0.8)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo/Shield Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-48 h-48 bg-gold/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-36 h-36 bg-amber-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="relative p-6 rounded-full border border-gold/50 bg-gradient-to-b from-gold/20 via-gold/5 to-transparent backdrop-blur-md shadow-[0_0_80px_rgba(201,162,39,0.4)]">
            <Logo size="xl" className="drop-shadow-[0_0_30px_rgba(201,162,39,0.9)]" />
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide bg-gradient-to-r from-amber-200 via-gold to-amber-300 bg-clip-text text-transparent drop-shadow-lg leading-normal"
          style={{ 
            fontFamily: language === "fa" 
              ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
              : "inherit",
            textShadow: "0 0 40px rgba(201, 162, 39, 0.5)",
          }}
        >
          {t.title}
        </h1>

        {/* Tagline */}
        <p 
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ 
            fontFamily: language === "fa" 
              ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
              : "inherit" 
          }}
        >
          {t.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-navy font-semibold px-8 py-6 text-lg group shadow-[0_0_40px_rgba(201,162,39,0.4)] hover:shadow-[0_0_60px_rgba(201,162,39,0.6)] transition-all duration-300"
          >
            {t.cta1}
            <ArrowIcon className={`${isRTL ? "mr-2" : "ml-2"} w-5 h-5 group-hover:${isRTL ? "-translate-x-1" : "translate-x-1"} transition-transform`} />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gold/50 text-gold hover:bg-gold/10 hover:text-gold hover:border-gold/70 px-8 py-6 text-lg backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.1)]"
            onClick={(e) => handleSmoothScroll(e, 'services')}
          >
            <Globe className={`${isRTL ? "ml-2" : "mr-2"} w-5 h-5`} />
            {t.cta2}
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors">
            <Shield className="w-5 h-5 text-gold" />
            <span>{t.badge1}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors">
            <Globe className="w-5 h-5 text-gold" />
            <span>{t.badge2}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors">
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span>{t.badge3}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
