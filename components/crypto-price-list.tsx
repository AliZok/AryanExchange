"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    shortName: "BTC",
    price: "$70,799.00",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    chart: "/chart-to-bot.png"
  },
  {
    symbol: "ETH", 
    name: "Ethereum",
    shortName: "ETH",
    price: "$2,090.86",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    chart: "/chart-to-bot.png"
  },
  {
    symbol: "USDT",
    name: "Tether",
    shortName: "USDT",
    price: "$1.00",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    chart: "/chart-to-bot.png"
  },
  {
    symbol: "TRX",
    name: "Tron", 
    shortName: "TRX",
    price: "$0.2939",
    icon: "https://cryptologos.cc/logos/tron-trx-logo.png",
    chart: "/chart-to-bot.png"
  }
]

export function CryptoPriceList() {
  const { language } = useLanguage()

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
            {language === "fa" ? "صرافی آنلاین آرین" : "Online Aryan Exchange"}
          </h2>

          {/* Crypto List */}
          <div className="space-y-4">
            {cryptoData.map((crypto) => (
              <div 
                key={crypto.symbol}
                className="bg-background/80 backdrop-blur-md border border-gold/30 rounded-lg p-4 hover:bg-gold/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Icon, Short Name, Price */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8">
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

                  {/* Right side - Chart with Price Above */}
                  <div className="text-right">
                    <div className="font-bold text-foreground text-lg mb-1">
                      {crypto.price}
                    </div>
                    <div className="w-16 h-10">
                      <Image 
                        src={crypto.chart}
                        alt={`${crypto.symbol} chart`}
                        width={64}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-navy font-semibold px-8 py-3 text-lg shadow-[0_0_40px_rgba(201,162,39,0.4)] hover:shadow-[0_0_60px_rgba(201,162,39,0.6)] transition-all duration-300"
              style={{ 
                fontFamily: language === "fa" 
                  ? "'IranSans', 'Tahoma', 'Arial', sans-serif" 
                  : "inherit" 
              }}
            >
              {language === "fa" ? "شروع کنید" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
