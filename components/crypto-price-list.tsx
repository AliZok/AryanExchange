"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useState, useEffect } from "react"

export function CryptoPriceList() {
  const { language } = useLanguage()
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('/api/crypto-prices')
        if (response.ok) {
          const result = await response.json()
          // Transform the data to match the expected format
          const transformedData = result.data.map(crypto => ({
            symbol: crypto.symbol,
            name: language === "fa" ? crypto.name_fa : crypto.name,
            shortName: crypto.symbol,
            price: crypto.price_usd ? `$${crypto.price_usd.toLocaleString()}` : "Price not available",
            icon: crypto.icon,
            chart: crypto.change_24h >= 0 ? "/chart-to-top.png" : "/chart-to-bot-2.png",
            change: crypto.change_24h
          }))
          setCryptoData(transformedData)
        }
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
        // Fallback to default data if API fails
        setCryptoData([
          {
            symbol: "BTC",
            name: "Bitcoin",
            shortName: "BTC",
            price: "قیمت موجود نیست",
            icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
            chart: "/chart-to-bot-2.png"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoPrices()
  }, [language])

  return (
    <section className="relative py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <h2 
            className="text-2xl font-bold text-center mb-8 text-gold"
            style={{ 
              fontFamily: language === "fa" 
                ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                : "inherit" 
            }}
          >
            {language === "fa" ? "ارز ها" : "Online Aryan Exchange"}
          </h2>

          {/* Crypto List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gold">
                {language === "fa" ? "در حال بارگذاری..." : "Loading..."}
              </div>
            ) : cryptoData.length === 0 ? (
              <div className="text-center py-8 text-gold">
                {language === "fa" ? "ارزی یافت نشد" : "No currencies found"}
              </div>
            ) : (
              cryptoData.map((crypto) => (
              <div 
                key={crypto.symbol}
                className="bg-background/80 backdrop-blur-md border border-gold/30 rounded-lg p-2 hover:bg-gold/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Icon, Short Name, Price */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Image 
                        src={crypto.icon}
                        alt={`${crypto.symbol} icon`}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-lg">
                        {crypto.name} ({crypto.shortName})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-foreground text-md !leading-[1]">
                      {crypto.price}
                    </div>

                    <div className="">
                      <Image 
                        src={crypto.chart}
                        alt={`${crypto.symbol} chart`}
                        width={64}
                        height={40}
                        className="w-full h-full object-contain min-w-[120px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </section>
  )
}
