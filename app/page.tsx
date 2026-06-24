import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollHero3D from '@/components/hero/ScrollHero3D';
import FeaturesSection from '@/components/home/FeaturesSection';
import SpecsSection from '@/components/home/SpecsSection';
import ClosingCTA from '@/components/home/ClosingCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <ScrollHero3D />
        <FeaturesSection />
        <SpecsSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
