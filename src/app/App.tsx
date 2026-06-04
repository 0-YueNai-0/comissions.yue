import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { PricingSection } from './components/PricingSection';
import { OrderSection } from './components/OrderSection';
import { GallerySection } from './components/GallerySection';
import { TermsSection } from './components/TermsSection';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <CatalogSection />
        <PricingSection />
        <OrderSection />
        <GallerySection />
        <TermsSection />
        <PaymentSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}