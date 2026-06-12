import { Heart, Sparkles } from 'lucide-react';
import img1 from '../../imports/G3rxk1lWoAAjRuc.jpg';
import img2 from '../../imports/G9j9PAeXcAAXZIt.jpg';
import img3 from '../../imports/G9VPrXGWUAA1YaT.jpg';
import img4 from '../../imports/GyDsJ4GWEAMEAmT.jpg';
import img5 from '../../imports/HBQxyuqWAAAN7B2.png';
import img6 from '../../imports/HBZWuCFXoAEhjVW.jpg';

const commissionTypes = [
  {
    id: 1,
    title: 'Bust / Portrait',
    description: 'Detailed headshot capturing expression & personality with beautiful shading! ✨',
    price: 'Starting at $4',
    image: img3,
    popular: false,
    badge: null,
    accentColor: 'from-pink-400 to-rose-400',
    glowColor: 'hover:shadow-pink-300/40',
  },
  {
    id: 2,
    title: 'Half Body',
    description: 'Waist-up illustration with full outfit details and dynamic poses~ 💕',
    price: 'Starting at $6',
    image: img4,
    popular: true,
    badge: '⭐ Most Popular',
    accentColor: 'from-cyan-400 to-teal-400',
    glowColor: 'hover:shadow-cyan-300/40',
  },
  {
    id: 3,
    title: 'Full Body',
    description: 'Complete character head-to-toe with expressive pose & custom background! 🌈',
    price: 'Starting at $8',
    image: img1,
    popular: true,
    badge: '🔥 Best Value',
    accentColor: 'from-yellow-400 to-amber-400',
    glowColor: 'hover:shadow-yellow-300/40',
  },
  {
    id: 4,
    title: 'Chibi',
    description: 'Super cute chibi style with big eyes and adorable proportions~ 🌟',
    price: 'Starting at $5',
    image: img5,
    popular: false,
    badge: null,
    accentColor: 'from-purple-400 to-violet-400',
    glowColor: 'hover:shadow-purple-300/40',
  },
  {
    id: 5,
    title: 'Couple Illustration',
    description: 'Two characters together in a lovely scene — perfect for OTPs! 💑',
    price: 'Starting at $8',
    image: img2,
    popular: false,
    badge: '💖 Fan Fave',
    accentColor: 'from-rose-400 to-pink-500',
    glowColor: 'hover:shadow-rose-300/40',
  },
  {
    id: 6,
    title: 'Character Sheet',
    description: 'Full reference sheet with multiple views, expressions & color palette! 📋',
    price: 'Starting at $25',
    image: img6,
    popular: false,
    badge: null,
    accentColor: 'from-emerald-400 to-teal-400',
    glowColor: 'hover:shadow-emerald-300/40',
  },
  {
    id: 7,
    title: 'Custom Commission',
    description: 'Have a unique vision? Let\'s bring your creative idea to life together! 🎨',
    price: 'Price upon request',
    image: null,
    popular: false,
    badge: '✨ Anything Goes',
    accentColor: 'from-indigo-400 to-cyan-400',
    glowColor: 'hover:shadow-indigo-300/40',
  },
];

export function CatalogSection() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="catalog" className="py-24 relative bg-gradient-to-b from-[#0d4a4a] via-[#0f5555] to-[#0d4a4a]">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-semibold">
            <span>🎨</span>
            <span>Commission Catalog</span>
            <span>🎨</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            What Can I Draw For You?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Browse my commission types below! Each piece is drawn with love and care~ 💖
            High-res files + revisions included!
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {commissionTypes.map((type) => (
            <div
              key={type.id}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/15 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${type.glowColor} hover:border-white/30`}
            >
              {/* Badge */}
              {type.badge && (
                <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                  {type.badge}
                </div>
              )}

              {/* Image area */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-white/5">
                {type.image ? (
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder for Custom Commission */
                  <div className={`w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br ${type.accentColor} opacity-30`}>
                    <Sparkles className="w-16 h-16 text-white" />
                    <span className="text-white font-bold text-lg">Your Vision Here!</span>
                  </div>
                )}
                {/* Gradient overlay at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{type.title}</h3>
                </div>

                <p className="text-white/65 text-sm leading-relaxed">{type.description}</p>

                {/* Price */}
                <div className="flex items-center gap-2 pt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${type.accentColor} text-white shadow-md`}>
                    {type.price}
                  </span>
                </div>

                {/* CTA button */}
                <button
                  onClick={scrollToOrder}
                  className="w-full mt-auto px-4 py-3 bg-white/10 hover:bg-yellow-400 hover:text-yellow-900 text-white font-bold rounded-2xl border border-white/20 hover:border-yellow-400 transition-all duration-200 text-sm hover:shadow-lg hover:shadow-yellow-400/30 group-hover:scale-[1.02]"
                >
                  Order This Commission ✨
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="text-4xl">🤔</div>
            <h3 className="text-2xl font-bold text-white">Not Sure Which to Choose?</h3>
            <p className="text-white/70 leading-relaxed">
              No worries! I'm happy to help you decide~ Contact me with your ideas and I'll recommend
              the perfect option for your vision and budget! 💕
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-full hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
      
              <Heart className="w-5 h-5 fill-current" />
              Get in Touch!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
