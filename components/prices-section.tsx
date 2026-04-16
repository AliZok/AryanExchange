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
    price: 0,
    change: 0,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "USD/AMD",
    name: "Dollar per Dram",
    nameFa: "dollar rams",
    price: 0,
    change: -0.1,
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    symbol: "USD/IRR",
    name: "Dollar per Iranian Rial",
    nameFa: "dollar iranian",
    price: 0,
    change: 0.2,
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin per Dollar",
    nameFa: "bitcoin dollar",
    price: 0,
    change: 2.3,
    icon: <Bitcoin className="w-5 h-5" />
  },
  {
    symbol: "TRX/USD",
    name: "TRON per Dollar",
    nameFa: "tron dollar",
    price: 0,
    change: 1.2,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "LTC/USD",
    name: "Litecoin per Dollar",
    nameFa: "litecoin dollar",
    price: 0,
    change: -0.8,
    icon: <Coins className="w-5 h-5" />
  },
  {
    symbol: "USDT/USD",
    name: "Tether per Dollar",
    nameFa: "tether dollar",
    price: 0,
    change: 0.01,
    icon: <Coins className="w-5 h-5" />
  }
]

export function PricesSection() {
  const { language, isRTL } = useLanguage()
  const [prices, setPrices] = useState(mockPrices)

  // Fetch real crypto prices from CoinGecko API
  const fetchCryptoPrices = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tron,litecoin,tether&vs_currencies=usd&include_24hr_change=true',
        {
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal
        }
      )
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format')
      }
      
      setPrices(prevPrices => 
        prevPrices.map(price => {
          // Map symbol to correct CoinGecko ID
          let cryptoId = null
          if (price.symbol.includes('BTC')) cryptoId = 'bitcoin'
          else if (price.symbol.includes('TRX')) cryptoId = 'tron'
          else if (price.symbol.includes('LTC')) cryptoId = 'litecoin'
          else if (price.symbol.includes('USDT')) cryptoId = 'tether'
          
          const cryptoData = cryptoId ? data[cryptoId] : null
          
          if (cryptoData && typeof cryptoData === 'object' && 'usd' in cryptoData) {
            return {
              ...price,
              price: typeof cryptoData.usd === 'number' ? cryptoData.usd : price.price,
              change: typeof cryptoData.usd_24h_change === 'number' ? cryptoData.usd_24h_change : 0
            }
          }
          return price
        })
      )
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error)
      // Silently fail to avoid disrupting user experience
      // Could add user notification here if needed
    }
  }

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchCryptoPrices()
    const interval = setInterval(fetchCryptoPrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes("IRR")) {
      return `${price.toFixed(2)}`
    }
    if (price >= 1000) {
      return `${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `${price.toFixed(2)}`
  }

  return (
    <section className="relative py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4">

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
                      {item.symbol === "USD/IRR" ? "IRR " : 
                       item.symbol === "USD/AMD" ? "AMD " : 
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
    </section>
  )
}
