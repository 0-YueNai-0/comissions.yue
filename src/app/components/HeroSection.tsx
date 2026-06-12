import { Sparkles, ArrowRight, Star } from 'lucide-react';
import featuredArt from '../../imports/GwVUPqpWcAAnXVL.jpg';

export function HeroSection() {
  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,188,212,0.15),transparent)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-secondary/30 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-semibold text-foreground">Open for Commissions! ✨</span>
            </div>

            <div className="space-y-6">
             <h1 className="flex flex-col">
  <span className="text-3xl sm:text-6xl lg:text-7xl font-bold leading-tight">
    Let Me
  </span>

  <span className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
    Bring Your
  </span>

  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-sm text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
    Dreams to Life! 🌟
  </span>
</h1>
              <p className="text-xl text-foreground/80 max-w-xl leading-relaxed">
                Cute and professional digital art commissions for your characters, OCs, fanart, and original creations.
                Quality artwork with love and care! 💖
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToOrder}
                className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-bold rounded-full hover:from-accent/90 hover:to-accent transition-all shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:scale-105 flex items-center justify-center gap-2"
              >
                Order Commission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all border-2 border-primary shadow-lg hover:shadow-xl hover:scale-105"
              >
                View Catalog
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2 p-4 bg-white rounded-3xl shadow-lg border-2 border-primary/20">
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground font-semibold">Happy Clients (I'm still a beginner!)</div>
              </div>
              <div className="text-center space-y-2 p-4 bg-white rounded-3xl shadow-lg border-2 border-accent/20">
                <div className="text-4xl font-bold text-accent flex items-center justify-center gap-1">
                  4.9<Star className="w-6 h-6 fill-accent" />
                </div>
                <div className="text-sm text-muted-foreground font-semibold">Rating owo</div>
              </div>
              <div className="text-center space-y-2 p-4 bg-white rounded-3xl shadow-lg border-2 border-secondary/40">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">3-7d</div>
                <div className="text-sm text-muted-foreground font-semibold">Delivery</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-[3rem] blur-3xl animate-pulse" />
            <div className="relative bg-white border-4 border-primary/30 rounded-[3rem] p-8 shadow-2xl">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={featuredArt} alt="Featured Artwork Showcase" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
