import HeroSection from "@/components/hero-section";
import Header from "@/components/header";
import FeaturesGrid from "@/components/features-grid";
import PricingCards from "@/components/pricing-cards";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <PricingCards />
      <Footer />
    </div>
  );
}

