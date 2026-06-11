import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Heart, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EXTERNAL_LINK_PROPS, SOCIAL_LINKS } from '../constants/socialLinks';
import commissionExamplesImage from '../../imports/commission_examples.png';
import portraitImage from '../../imports/portrait.png';
import halfBodyImage from '../../imports/half_body.png';
import fullBodyImage from '../../imports/full_body.png';
import fantasyImage from '../../imports/fantasy.png';
import animeStyleImage from '../../imports/anime_style.png';

interface GalleryItem {
  category: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    category: 'Commission Examples',
    image: commissionExamplesImage,
  },
  {
    category: 'Portrait',
    image: portraitImage,
  },
  {
    category: 'Half Body',
    image: halfBodyImage,
  },
  {
    category: 'Full Body',
    image: fullBodyImage,
  },
  {
    category: 'Fantasy',
    image: fantasyImage,
  },
  {
    category: 'Anime Style',
    image: animeStyleImage,
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedTitle(null);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

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
          {galleryItems.map((item) => (
            <div
              key={item.category}
              className="group relative bg-card border-2 border-border rounded-3xl overflow-hidden hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                <ImageWithFallback
                  src={item.image}
                  alt={item.category}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-8">
                  <button
                    type="button"
                    onClick={() => openModal(item.image, item.category)}
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-full flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Full Size
                  </button>
                </div>
              </div>
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
            <a
              href={SOCIAL_LINKS.x}
              {...EXTERNAL_LINK_PROPS}
              className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              X
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              {...EXTERNAL_LINK_PROPS}
              className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              Instagram
            </a>
            <a
              href={SOCIAL_LINKS.tumblr}
              {...EXTERNAL_LINK_PROPS}
              className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              Tumblr
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              {...EXTERNAL_LINK_PROPS}
              className="px-6 py-3 bg-white hover:bg-primary hover:text-white rounded-full transition-all border-2 border-border hover:border-primary shadow-md hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && selectedImage && selectedTitle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedTitle}
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close image preview"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white drop-shadow-md">{selectedTitle}</h3>
            <img
              src={selectedImage}
              alt={selectedTitle}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
