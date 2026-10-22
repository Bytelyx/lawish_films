import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Maximize2, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CinematicPhotoStrip = ({ images = [], onPhotoClick }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Take the first 3 featured gallery photos
  const featuredThree = images.slice(0, 3);

  useEffect(() => {
    if (!trackRef.current || featuredThree.length < 3) return;

    const ctx = gsap.context(() => {
      // 1. Reveal on scroll entry (GSAP ScrollTrigger)
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: 45,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Subtle container parallax on scroll
      gsap.fromTo(
        containerRef.current,
        { yPercent: 3 },
        {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 3. Continuous seamless horizontal infinite loop (GSAP)
      // We have 3 identical sets of [Photo 01, Photo 02, Photo 03].
      // Shifting xPercent: -33.33333333333333% shifts exactly 1 full set of 3 photos.
      // Because each set is identical in elements and spacing, when it reaches -33.333%,
      // it seamlessly repeats to 0% with ZERO visible jump, gap, or stutter!
      const isMobile = window.innerWidth < 768;
      const baseDuration = isMobile ? 22 : 28;

      const loop = gsap.to(trackRef.current, {
        xPercent: -33.333333333333336,
        duration: baseDuration,
        ease: 'none',
        repeat: -1,
      });

      tweenRef.current = loop;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [featuredThree.length]);

  // Hover Interaction:
  // Animation NEVER stops. It continues moving automatically.
  // When user hovers: slightly slows down (0.6x) and adds overlay/scale.
  // When mouse leaves: smoothly accelerates back to normal speed (1.0x).
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.6, duration: 0.9, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.9, ease: 'power2.out' });
    }
  };

  if (featuredThree.length < 3) return null;

  // 3 identical sets for mathematical seamless continuity
  const sets = [0, 1, 2];

  return (
    <div
      ref={containerRef}
      className="relative w-full mb-16 sm:mb-24 rounded-sm overflow-hidden border border-white/10 bg-[#0c0c11] shadow-[0_30px_90px_rgba(0,0,0,0.9)] select-none group/strip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Cinematic Frame Top Letterbox Bar */}
      <div className="px-5 sm:px-8 py-3.5 bg-[#08080a] border-b border-white/[0.08] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold-300 uppercase">
              35MM CONTINUOUS CINEMATIC MOTION REEL
            </span>
          </div>
          <span className="hidden md:inline-block text-white/30 text-[10px]">•</span>
          <span className="hidden md:inline-block text-[10px] font-mono tracking-widest text-white/50">
            24 FPS SEAMLESS STREAM
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-white/60">
          <span className="hidden sm:inline-block uppercase text-gold-400/90">
            PHOTO 01 → PHOTO 02 → PHOTO 03 → ⟳
          </span>
          <span className="text-white/40">
            {isHovered ? 'PREVIEW (SLOWED MOTION)' : 'CONTINUOUS MOTION'}
          </span>
        </div>
      </div>

      {/* Viewing Aperture with Continuous Horizontal Movement */}
      <div className="relative w-full overflow-hidden py-6 sm:py-8 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f15] to-[#09090c]">
        {/* Left Edge Cinematic Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#0c0c11] via-[#0c0c11]/80 to-transparent z-20 pointer-events-none" />

        {/* Right Edge Cinematic Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#0c0c11] via-[#0c0c11]/80 to-transparent z-20 pointer-events-none" />

        {/* Moving Track */}
        <div
          ref={trackRef}
          className="flex items-center w-max will-change-transform"
        >
          {sets.map((setIdx) => (
            <div
              key={`set-${setIdx}`}
              className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0"
            >
              {featuredThree.map((photo, photoIdx) => {
                const photoNumber = String(photoIdx + 1).padStart(2, '0');

                return (
                  <div
                    key={`photo-${setIdx}-${photo.id || photoIdx}`}
                    onClick={() => onPhotoClick && onPhotoClick(photoIdx)}
                    className="group/card relative w-[310px] sm:w-[460px] md:w-[600px] lg:w-[720px] aspect-[16/10] rounded-sm overflow-hidden bg-[#14141c] border border-white/[0.08] hover:border-gold-400/50 cursor-pointer shadow-2xl shrink-0 transition-all duration-500"
                  >
                    {/* Image with slight scale & brightness on hover */}
                    <img
                      src={photo.url}
                      alt={photo.title || `Sequence Frame ${photoNumber}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 filter brightness-95 group-hover/card:brightness-105"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Subtle Cinematic Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/25 group-hover/card:via-transparent transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />

                    {/* Film Reel Frame Marks (Top) */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-gold-400">
                        <span>FRAME {photoNumber}</span>
                        <span className="text-white/40">/ 03</span>
                      </div>

                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
                        CONTINUOUS REEL
                      </span>
                    </div>

                    {/* Information Overlay (Bottom) */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex items-end justify-between z-10">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-gold-400 uppercase">
                          FEATURED MOTION FRAME {photoNumber}
                        </span>
                        <h4 className="font-editorial-luxury text-xl sm:text-2xl md:text-3xl text-white tracking-wide mt-0.5">
                          {photo.title || 'Untitled Still'}
                        </h4>
                        {photo.location && (
                          <p className="flex items-center gap-1.5 text-[11px] text-white/70 tracking-wider font-sans mt-1">
                            <MapPin className="w-3 h-3 text-gold-400" />
                            <span>{photo.location}</span>
                          </p>
                        )}
                      </div>

                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover/card:bg-gold-500 group-hover/card:text-black group-hover/card:scale-110 transition-all shadow-lg shrink-0">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Frame Bottom Letterbox Bar */}
      <div className="px-5 sm:px-8 py-2.5 bg-[#08080a] border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono tracking-widest text-white/40">
        <div className="flex items-center gap-2">
          <Film className="w-3 h-3 text-gold-400" />
          <span>CINEMATIC CONTINUOUS MOTION REEL • REPEAT INFINITE</span>
        </div>
        <span>HOVER TO INSPECT • CLICK ANY FRAME TO EXPAND</span>
      </div>
    </div>
  );
};
