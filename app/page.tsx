import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PricesSection } from "@/components/prices-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { HoursSection } from "@/components/hours-section"
import { ContactSection } from "@/components/contact-section"
import { PaymentMethodsSection } from "@/components/payment-methods-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PricesSection />
      <ServicesSection />
      <AboutSection />
      <HoursSection />
      <ContactSection />
      <PaymentMethodsSection />
      <Footer />
    </main>
  )
}
