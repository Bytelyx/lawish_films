import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Maximize2 } from 'lucide-react';
import { Lightbox } from './Lightbox';
import { ThreeCinematicStrips } from './ThreeCinematicStrips';

gsap.registerPlugin(ScrollTrigger);

export const GalleryGrid = ({ images = [], title = 'CURATED GALLERY', subtitle }) => {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const hasThreeStrips = images.length >= 6;
  const stripsPhotoCount = images.length >= 12 ? 12 : (images.length >= 9 ? 9 : images.length);
  const remainingImages = hasThreeStrips ? images.slice(stripsPhotoCount) : images;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.gallery-item');
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          const img = card.querySelector('img');

          // Subtle parallax on scroll
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.08, yPercent: -4 },
              {
                scale: 1,
                yPercent: 4,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section ref={containerRef} className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#09090b] text-white">
      {/* Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              FINE ART FRAMES
            </span>
            <h2 className="font-editorial-luxury text-3xl sm:text-5xl tracking-wide uppercase mt-1">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs text-white/50 tracking-wider font-light">
                {subtitle}
              </p>
            )}
          </div>
          <span className="mt-3 sm:mt-0 text-xs font-mono tracking-widest text-white/40">
            {images.length} CURATED STILLS
          </span>
        </div>

        {/* THREE SEPARATE INDEPENDENT CINEMATIC PHOTO STRIPS */}
        {hasThreeStrips && (
          <ThreeCinematicStrips
            images={images}
            onPhotoClick={(idx) => openLightbox(idx)}
          />
        )}

        {/* Section Sub-divider if there are remaining images */}
        {hasThreeStrips && remainingImages.length > 0 && (
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              ARCHIVAL COLLECTION FRAMES ({String(stripsPhotoCount + 1).padStart(2, '0')} — {String(images.length).padStart(2, '0')})
            </span>
            <span className="text-[10px] font-mono tracking-widest text-gold-400/80">
              EDITORIAL STUDY
            </span>
          </div>
        )}

        {/* Dynamic Editorial Layout for Remaining Photos */}
        {remainingImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {remainingImages.map((img, relIdx) => {
              const actualIndex = hasThreeStrips ? relIdx + stripsPhotoCount : relIdx;

              // Determine dynamic editorial layout spanning
              const cycleIndex = relIdx % 6;
              let colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[4/5]';

              if (cycleIndex === 0) {
                colSpan = 'sm:col-span-2 lg:col-span-7 aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3]';
              } else if (cycleIndex === 1) {
                colSpan = 'sm:col-span-1 lg:col-span-5 aspect-[4/5]';
              } else if (cycleIndex === 2) {
                colSpan = 'sm:col-span-2 lg:col-span-12 aspect-[16/9] sm:aspect-[21/9]';
              } else if (cycleIndex === 3) {
                colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[3/4]';
              } else if (cycleIndex === 4) {
                colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[4/5]';
              } else if (cycleIndex === 5) {
                colSpan = 'sm:col-span-2 lg:col-span-4 aspect-[3/4]';
              }

              return (
                <motion.div
                  key={img.id || actualIndex}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: (relIdx % 3) * 0.1 }}
                  onClick={() => openLightbox(actualIndex)}
                  className={`gallery-item group relative overflow-hidden rounded-sm bg-[#121218] border border-white/[0.08] hover:border-gold-400/40 cursor-pointer shadow-lg ${colSpan}`}
                >
                  {/* Image */}
                  <img
                    src={img.url}
                    alt={img.title || 'Curated Still'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Floating Information Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                    <div>
                      <h3 className="font-editorial-luxury text-xl sm:text-2xl text-white tracking-wide">
                        {img.title || 'Untitled Still'}
                      </h3>
                      {img.location && (
                        <p className="flex items-center gap-1.5 text-[11px] text-gold-400 tracking-wider font-sans mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{img.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-gold-400 group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Number Watermark in corner */}
                  <span className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-white/40 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {String(actualIndex + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
