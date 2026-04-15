"use client"

import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  textClassName?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8", 
  lg: "w-16 h-16",
  xl: "w-24 h-24"
}

export function Logo({ size = "md", className = "", showText = false, textClassName = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]} object-contain`}>
        <Image
          src="/aryan-exchange-logo-2.jpg"
          alt="Aryan Exchange Logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold text-gold ${textClassName}`}>
          Aryan Exchange
        </span>
      )}
    </div>
  )
}
