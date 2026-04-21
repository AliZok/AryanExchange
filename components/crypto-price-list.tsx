"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useState, useEffect } from "react"

export function CryptoPriceList() {
  const { language } = useLanguage()
  const [cryptoData, setCryptoData] = useState([])
  const [currenciesData, setCurrenciesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch crypto prices
        const cryptoResponse = await fetch('/api/crypto-prices')
        if (cryptoResponse.ok) {
          const cryptoResult = await cryptoResponse.json()
          const transformedCryptoData = cryptoResult.data.map(crypto => ({
            symbol: crypto.symbol,
            name: language === "fa" ? crypto.name_fa : crypto.name,
            shortName: crypto.symbol,
            price: crypto.price_usd ? `$${crypto.price_usd.toLocaleString()}` : "Price not available",
            icon: crypto.icon,
            chart: crypto.change_24h >= 0 ? "/chart-to-top.png" : "/chart-to-bot-2.png",
            change: crypto.change_24h
          }))
          setCryptoData(transformedCryptoData)
        }

        // Fetch currencies
        const currenciesResponse = await fetch('/api/currencies')
        if (currenciesResponse.ok) {
          const currenciesResult = await currenciesResponse.json()
          const transformedCurrencies = currenciesResult.map(currency => ({
            symbol: currency.code || currency.id,
            name: currency.name,
            name_farsi: currency.name_farsi,
            name_english: currency.name_english,
            shortName: currency.code || '',
            price: currency.price || "Price not available",
            icon: currency.image,
            chart: "/chart-to-top.png"
          }))
          setCurrenciesData(transformedCurrencies)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
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

    fetchData()
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

                {/* Currencies List */}
          <div className="space-y-4 mt-8 mb-3">
         
            {loading ? (
              <div className="text-center py-4 text-gold">
                {language === "fa" ? "در حال بارگذاری..." : "Loading..."}
              </div>
            ) : currenciesData.length === 0 ? (
              <div className="text-center py-4 text-gold">
                {language === "fa" ? "ارزی یافت نشد" : "No currencies found"}
              </div>
            ) : (
              currenciesData.map((currency) => (
              <div 
                key={currency.symbol}
                className="bg-background/80 backdrop-blur-md border border-gold/30 rounded-lg p-2 hover:bg-gold/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Icon, Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      {currency.icon ? (
                        <Image 
                          src={currency.icon}
                          alt={`${currency.symbol} icon`}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-gold font-bold text-sm">
                            {language === "fa" 
                              ? (currency.name_farsi?.charAt(0)?.toUpperCase() || currency.name?.charAt(0)?.toUpperCase() || 'C')
                              : (currency.name_english?.charAt(0)?.toUpperCase() || currency.name?.charAt(0)?.toUpperCase() || 'C')
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-lg">
                        {language === "fa" 
                          ? (currency.name_farsi || currency.name)
                          : (currency.name_english || currency.name)
                        }
                      </div>
                      {currency.shortName && (
                        <div className="text-sm text-foreground/70">
                          {currency.shortName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-foreground text-md !leading-[1]">
                      {currency.price}
                    </div>

                    <div className="">
                      <Image 
                        src={currency.chart}
                        alt={`${currency.symbol} chart`}
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
                  {/* Left side - Icon, Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      {crypto.icon ? (
                        <Image 
                          src={crypto.icon}
                          alt={`${crypto.symbol} icon`}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-gold font-bold text-sm">
                            {crypto.name?.charAt(0)?.toUpperCase() || 'C'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-lg">
                        {crypto.name}
                      </div>
                      {crypto.shortName && (
                        <div className="text-sm text-foreground/70">
                          {crypto.shortName}
                        </div>
                      )}
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
