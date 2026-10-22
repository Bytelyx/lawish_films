import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin, Maximize2 } from 'lucide-react';

export const Lightbox = ({ images = [], currentIndex = 0, isOpen = false, onClose, onIndexChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[currentIndex] || null;

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    if (images.length > 0) {
      onIndexChange((currentIndex + 1) % images.length);
    }
  }, [currentIndex, images.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    if (images.length > 0) {
      onIndexChange((currentIndex - 1 + images.length) % images.length);
    }
  }, [currentIndex, images.length, onIndexChange]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#060608]/96 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline-block text-white/30 text-xs">•</span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-white/60">
              {currentImage.title || 'ARCHIVE STUDY'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors border border-white/10"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              aria-label="Toggle Zoom"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-gold-500 hover:text-black text-white/80 transition-all border border-white/10"
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Image Display */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-gold-500 hover:text-black text-white/80 backdrop-blur-md border border-white/10 transition-all group"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-gold-500 hover:text-black text-white/80 backdrop-blur-md border border-white/10 transition-all group"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Animate Current Image */}
          <motion.div
            key={currentImage.id || currentIndex}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.75 : 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`max-h-[82vh] max-w-[90vw] flex items-center justify-center transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title || 'Portfolio Image'}
              className="max-h-[80vh] max-w-full object-contain rounded-xs shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/10 select-none"
            />
          </motion.div>
        </div>

        {/* Bottom Details Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 z-10 max-w-5xl mx-auto w-full pt-2 border-t border-white/[0.08]">
          <div>
            <h4 className="font-editorial-luxury text-xl sm:text-2xl text-white tracking-wide">
              {currentImage.title || 'Untitled Still'}
            </h4>
            {currentImage.location && (
              <p className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-gold-400 tracking-wider font-sans mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{currentImage.location}</span>
              </p>
            )}
          </div>
          <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans">
            CLICK IMAGE TO ZOOM • USE ARROW KEYS TO NAVIGATE
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
