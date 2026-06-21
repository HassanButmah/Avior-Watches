import Header from './components/Header';
import ScrollHero from './components/ScrollHero';
import FeaturesSection from './components/FeaturesSection';
import SpecsSection from './components/SpecsSection';
import ClosingCTA from './components/ClosingCTA';

export default function Home() {
  return (
    <main style={{ background: '#000000' }}>
      <Header />
      <ScrollHero />
      <FeaturesSection />
      <SpecsSection />
      <ClosingCTA />
    </main>
  );
}
