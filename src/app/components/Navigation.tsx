import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const mainLinks = [
    { label: 'Home', id: 'home', emoji: '🏠' },
    { label: 'Catalog', id: 'catalog', emoji: '📚' },
    { label: 'Pricing', id: 'pricing', emoji: '💰' },
    { label: 'Order', id: 'order', emoji: '✨' },
  ];

  const secondaryLinks = [
    { label: 'Gallery', id: 'gallery' },
    { label: 'Terms', id: 'terms' },
    { label: 'Payment', id: 'payment' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b-4 border-primary/20'
          : 'bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="hidden sm:block font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Yue_Nai
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 font-semibold text-foreground hover:text-primary transition-all relative group rounded-full hover:bg-primary/10"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-sm">{link.emoji}</span>
                  {link.label}
                </span>
              </button>
            ))}
            <div className="h-8 w-px bg-border mx-2" />
            {secondaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all rounded-full hover:bg-primary/10"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-all border-2 border-primary/20"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b-4 border-primary/20 shadow-xl">
          <div className="px-4 py-4 space-y-2">
            {[...mainLinks, ...secondaryLinks].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all font-semibold border-2 border-transparent hover:border-primary/20"
              >
                {'emoji' in link && <span className="mr-2">{link.emoji}</span>}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
