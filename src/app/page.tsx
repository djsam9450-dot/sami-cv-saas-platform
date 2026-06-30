import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TemplatesShowcase } from "@/components/home/templates-showcase";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { PricingSection } from "@/components/home/pricing";
import { FAQ } from "@/components/home/faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesShowcase />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
