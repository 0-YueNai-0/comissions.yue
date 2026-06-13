import { Heart } from 'lucide-react';
import { EXTERNAL_LINK_PROPS, SOCIAL_LINKS } from '../constants/socialLinks';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-secondary/20 border-t-4 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-xl">✨</span>
              </div>
              <span className="font-bold text-lg">Yue_Nai</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional digital art commissions for your characters and creative projects.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('catalog')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('terms')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('payment')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Payment Methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('order')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Order Commission
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Follow me on social media for updates, WIPs, and special offers.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={SOCIAL_LINKS.x}
                {...EXTERNAL_LINK_PROPS}
                className="px-4 py-2 bg-primary text-white hover:bg-primary/80 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
              >
                X
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                {...EXTERNAL_LINK_PROPS}
                className="px-4 py-2 bg-accent text-white hover:bg-accent/80 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.tumblr}
                {...EXTERNAL_LINK_PROPS}
                className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Tumblr
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                {...EXTERNAL_LINK_PROPS}
                className="px-4 py-2 bg-primary/80 text-white hover:bg-primary/70 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/70 font-medium">
            © 2026 Yue_Nai. All rights reserved! ✨
          </p>
          <p className="text-sm text-foreground/70 flex items-center gap-1.5 font-medium">
            Made with <Heart className="w-5 h-5 text-accent fill-accent animate-pulse" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
