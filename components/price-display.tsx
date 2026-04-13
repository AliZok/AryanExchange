"use client"

import { TrendingUp, TrendingDown, DollarSign, Coins, Bitcoin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

interface PriceItem {
  symbol: string
  name: string
  nameFa: string
  price: number
  change: number
  icon: React.ReactNode
  isCrypto?: boolean
}

const mockPrices: PriceItem[] = [
  {
    symbol: "AMD/IRR",
    name: "Dram per Iranian Toman",
    nameFa: "-rams iranian",
    price: 1.05,
    change: 0.3,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "USD/AMD",
    name: "Dollar per Dram",
    nameFa: "dollar rams",
    price: 384.62,
    change: -0.1,
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    symbol: "USD/IRR",
    name: "Dollar per Iranian Rial",
    nameFa: "dollar iranian",
    price: 0.000024,
    change: 0.2,
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin per Dollar",
    nameFa: "bitcoin dollar",
    price: 67500,
    change: 2.3,
    icon: <Bitcoin className="w-5 h-5" />
  },
  {
    symbol: "TRX/USD",
    name: "TRON per Dollar",
    nameFa: "tron dollar",
    price: 0.16,
    change: 1.2,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "LTC/USD",
    name: "Litecoin per Dollar",
    nameFa: "litecoin dollar",
    price: 72.50,
    change: -0.8,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "USDT/USD",
    name: "Tether per Dollar",
    nameFa: "tether dollar",
    price: 1.00,
    change: 0.01,
    icon: <Coins className="w-5 h-5" />
  }
]

export function PriceDisplay() {
  const { language, isRTL } = useLanguage()
  const [prices, setPrices] = useState(mockPrices)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          price: price.price * (1 + (Math.random() - 0.5) * 0.002),
          change: price.change + (Math.random() - 0.5) * 0.1
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "IRR") {
      return `${price.toFixed(5)}`
    }
    if (price >= 1000) {
      return `${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `${price.toFixed(2)}`
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {prices.map((item) => (
            <div
              key={item.symbol}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-amber-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-background/80 backdrop-blur-md border border-gold/30 rounded-lg p-3 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]">
                {/* Icon and Symbol */}
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-lg bg-gold/20 text-gold">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.symbol}
                  </span>
                  <div className="text-xl font-bold text-gold text-center" 
                    style={{ 
                      fontFamily: language === "fa" 
                        ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                        : "inherit" 
                    }}
                  >
                    {item.symbol.includes("USD") && !item.symbol.includes("BTC") && !item.symbol.includes("TRX") && !item.symbol.includes("LTC") && !item.symbol.includes("USDT") ? "IRR " : 
                     item.symbol.includes("/USD") ? "$" : ""}
                    {formatPrice(item.price, item.symbol)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last updated indicator */}
        <div className="text-center mt-6 text-xs text-foreground/50">
          <span 
            style={{ 
              fontFamily: language === "fa" 
                ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                : "inherit" 
            }}
          >
            {language === "fa" ? "-last update" : "Last updated"}: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}
