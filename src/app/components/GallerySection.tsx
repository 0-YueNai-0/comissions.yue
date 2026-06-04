import { ExternalLink, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from '../../imports/6AMDg_U2_Hern_ndezWendy_Mapa.png';

const galleryItems = [
  {
    category: 'Commission Examples',
    image: exampleImage,
    isReal: true,
  },
  {
    category: 'Portrait',
    color: 'from-pink-300/40 to-purple-300/40',
    emoji: '🎭',
    isReal: false,
  },
  {
    category: 'Half Body',
    color: 'from-cyan-300/40 to-blue-300/40',
    emoji: '👤',
    isReal: false,
  },
  {
    category: 'Full Body',
    color: 'from-green-300/40 to-emerald-300/40',
    emoji: '🧍',
    isReal: false,
  },
  {
    category: 'Fantasy',
    color: 'from-purple-300/40 to-indigo-300/40',
    emoji: '⚔️',
    isReal: false,
  },
  {
    category: 'Anime Style',
    color: 'from-pink-300/40 to-rose-300/40',
    emoji: '✨',
    isReal: false,
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-secondary/30 via-muted/30 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-accent fill-accent" />
            <span className="text-primary font-semibold">My Work</span>
            <Heart className="w-6 h-6 text-accent fill-accent" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Portfolio Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out some of my recent work across different styles and commission types! ✨
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border rounded-3xl overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 duration-300"
            >
              {item.isReal ? (
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-8">
                    <button className="px-6 py-3 bg-accent text-accent-foreground rounded-full flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ExternalLink className="w-4 h-4" />
                      View Full Size
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`aspect-[3/4] bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                  <div className="text-7xl opacity-70">{item.emoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                      <button className="px-6 py-3 bg-accent text-accent-foreground rounded-full flex items-center gap-2 shadow-xl">
                        <ExternalLink className="w-4 h-4" />
                        View Full Size
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-5 bg-gradient-to-r from-secondary/40 to-muted/40">
                <h3 className="font-bold text-lg">{item.category}</h3>
                <p className="text-sm text-muted-foreground">Commission Example</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/20 to-accent/10 border-2 border-border rounded-3xl p-8 text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold">Want to See More? 🌟</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit my full portfolio on social media platforms for more examples, WIPs, and behind-the-scenes content!
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200">
              Twitter/X
            </button>
            <button className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200">
              Instagram
            </button>
            <button className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200">
              ArtStation
            </button>
            <button className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200">
              DeviantArt
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
