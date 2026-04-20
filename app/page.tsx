import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CryptoPriceList } from "@/components/crypto-price-list"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { PaymentMethodsSection } from "@/components/payment-methods-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CryptoPriceList />
      <ServicesSection />
      <AboutSection />
      <PaymentMethodsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
