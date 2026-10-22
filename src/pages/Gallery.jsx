import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2 } from 'lucide-react';
import { getAllGalleryPhotos } from '../data/categories';
import { Lightbox } from '../components/Lightbox';
import { ThreeCinematicStrips } from '../components/ThreeCinematicStrips';
import { LetsConnect } from '../components/LetsConnect';
import { pageTransitionVariants } from '../animations/pageTransitions';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allPhotos = useMemo(() => getAllGalleryPhotos(), []);

  const filterTabs = [
    { label: 'ALL', id: 'ALL' },
    { label: 'WEDDING', id: 'wedding' },
    { label: 'INTIMATE', id: 'intimate' },
    { label: 'LIFESTYLE', id: 'lifestyle' },
    { label: 'PARTY', id: 'party' },
    { label: 'MATERNITY', id: 'maternity' },
  ];

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'ALL') return allPhotos;
    return allPhotos.filter(
      (photo) => photo.categoryId.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [allPhotos, activeFilter]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const hasThreeStrips = filteredPhotos.length >= 6;
  const stripsPhotoCount = filteredPhotos.length >= 12 ? 12 : (filteredPhotos.length >= 9 ? 9 : filteredPhotos.length);
  const remainingPhotos = hasThreeStrips ? filteredPhotos.slice(stripsPhotoCount) : filteredPhotos;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#09090b] text-white pt-32 sm:pt-40"
    >
      {/* Lightbox Modal */}
      <Lightbox
        images={filteredPhotos}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              PERMANENT ARCHIVE
            </span>
            <span className="w-8 h-[1px] bg-gold-400" />
          </div>

          <h1 className="font-editorial-luxury text-5xl sm:text-7xl md:text-8xl tracking-wide uppercase">
            GALLERY
          </h1>

          <p className="mt-4 font-serif italic text-lg sm:text-xl text-gold-300/90">
            "A collection of stories, emotions and moments."
          </p>

          <p className="mt-3 text-xs sm:text-sm text-white/50 tracking-wider font-light max-w-xl mx-auto">
            Explore over eighty curated fine-art frames spanning destination weddings,
            sensual boudoir, spontaneous street lifestyle, after-hours celebrations, and sacred maternity.
          </p>
        </div>

        {/* Category Filters (Smooth Animated Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 max-w-4xl mx-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            const count =
              tab.id === 'ALL'
                ? allPhotos.length
                : allPhotos.filter((p) => p.categoryId === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-black font-bold' : 'text-white/70 hover:text-white bg-white/[0.04] border border-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryPill"
                    className="absolute inset-0 bg-gold-400 rounded-full shadow-[0_0_20px_rgba(197,168,128,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 1. THREE SEPARATE INDEPENDENT CINEMATIC PHOTO STRIPS */}
        {hasThreeStrips && (
          <ThreeCinematicStrips
            key={`strips-${activeFilter}`}
            images={filteredPhotos}
            onPhotoClick={(idx) => openLightbox(idx)}
          />
        )}

        {/* Sub-divider for remaining photos */}
        {hasThreeStrips && remainingPhotos.length > 0 && (
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              GALLERY STILLS COLLECTION ({String(stripsPhotoCount + 1).padStart(2, '0')} — {String(filteredPhotos.length).padStart(2, '0')})
            </span>
            <span className="text-[10px] font-mono tracking-widest text-gold-400/80">
              {activeFilter} ARCHIVE
            </span>
          </div>
        )}

        {/* Dynamic Editorial Masonry Layout for Remaining Photos */}
        {remainingPhotos.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 min-h-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {remainingPhotos.map((photo, relIndex) => {
                const actualIndex = hasThreeStrips ? relIndex + stripsPhotoCount : relIndex;

                // Asymmetric editorial grid styling
                const cycle = relIndex % 5;
                let colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[4/5]';
                if (cycle === 0) {
                  colSpan = 'sm:col-span-2 lg:col-span-8 aspect-[16/10]';
                } else if (cycle === 1) {
                  colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[4/5]';
                } else if (cycle === 2) {
                  colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[3/4]';
                } else if (cycle === 3) {
                  colSpan = 'sm:col-span-1 lg:col-span-4 aspect-[4/5]';
                } else if (cycle === 4) {
                  colSpan = 'sm:col-span-2 lg:col-span-4 aspect-[3/4]';
                }

                return (
                  <motion.div
                    key={photo.id || actualIndex}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openLightbox(actualIndex)}
                    className={`group relative overflow-hidden rounded-sm bg-[#121218] border border-white/[0.08] hover:border-gold-400/40 cursor-pointer shadow-xl ${colSpan}`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Bottom Captions */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
                          {photo.categoryTitle}
                        </span>
                        <h3 className="font-editorial-luxury text-xl sm:text-2xl text-white tracking-wide mt-0.5">
                          {photo.title}
                        </h3>
                        {photo.location && (
                          <p className="flex items-center gap-1.5 text-[11px] text-white/70 tracking-wider font-sans mt-0.5">
                            <MapPin className="w-3 h-3 text-gold-400" />
                            <span>{photo.location}</span>
                          </p>
                        )}
                      </div>

                      <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-gold-400 transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Let's Connect CTA */}
      <LetsConnect />
    </motion.div>
  );
};
