import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/Hero";
import FeaturesSection from "@/components/features/FeaturesSection";
import HowItWorks from "@/components/features/HowItWorks";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
