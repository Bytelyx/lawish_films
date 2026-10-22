import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Maximize2, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CinematicBoxStrip = ({
  boxNumber = '01',
  boxLabel = 'REEL 01',
  photos = [],
  globalStartIndex = 0,
  direction = 'left',
  baseDuration = 26,
  onPhotoClick,
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!trackRef.current || photos.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Independent ScrollTrigger Entrance Reveal
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Subtle container parallax on scroll
      gsap.fromTo(
        containerRef.current,
        { yPercent: 2.5 },
        {
          yPercent: -2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 3. Continuous seamless horizontal infinite loop
      // 3 identical sets of [Photo 1 .. Photo N].
      // Shifting -33.333333333333336% covers exactly 1 complete set.
      const isMobile = window.innerWidth < 768;
      const duration = isMobile ? baseDuration * 0.9 : baseDuration;

      let fromX = 0;
      let toX = -33.333333333333336;

      if (direction === 'right') {
        fromX = -33.333333333333336;
        toX = 0;
      }

      gsap.set(trackRef.current, { xPercent: fromX });

      const loop = gsap.to(trackRef.current, {
        xPercent: toX,
        duration,
        ease: 'none',
        repeat: -1,
      });

      tweenRef.current = loop;
    }, containerRef);

    return () => ctx.revert();
  }, [photos, direction, baseDuration]);

  // Hover Interaction:
  // Affects ONLY this individual box!
  // Animation NEVER stops. Smoothly decelerates to 0.55x, then restores to 1.0x.
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.55, duration: 0.8, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.8, ease: 'power2.out' });
    }
  };

  if (!photos || photos.length === 0) return null;

  // 3 identical sets for mathematical seamless continuity
  const sets = [0, 1, 2];

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#0c0c11] shadow-[0_25px_80px_rgba(0,0,0,0.85)] select-none group/box transition-colors duration-500 hover:border-gold-500/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Box Header Bar */}
      <div className="px-5 sm:px-8 py-3 bg-[#07070a] border-b border-white/[0.08] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold-300 uppercase font-semibold">
              BOX {boxNumber} — {boxLabel}
            </span>
          </div>
          <span className="hidden md:inline-block text-white/30 text-[10px]">•</span>
          <span className="hidden md:inline-block text-[10px] font-mono tracking-widest text-white/50">
            {photos.length} MOTION FRAMES • {direction === 'right' ? 'INVERSE PAN' : 'DIRECT PAN'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-white/60">
          <span className="hidden sm:inline-block uppercase text-gold-400/80">
            {photos.map((_, i) => `0${globalStartIndex + i + 1}`).join(' → ')} → ⟳
          </span>
          <span className="text-white/40">
            {isHovered ? 'PREVIEW (SLOWED)' : 'CONTINUOUS'}
          </span>
        </div>
      </div>

      {/* Viewing Aperture with Continuous Horizontal Movement */}
      <div className="relative w-full overflow-hidden py-5 sm:py-7 bg-gradient-to-b from-[#09090e] via-[#0d0d14] to-[#08080b]">
        {/* Left Edge Cinematic Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#0c0c11] via-[#0c0c11]/80 to-transparent z-20 pointer-events-none" />

        {/* Right Edge Cinematic Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#0c0c11] via-[#0c0c11]/80 to-transparent z-20 pointer-events-none" />

        {/* Moving Track */}
        <div
          ref={trackRef}
          className="flex items-center w-max will-change-transform"
        >
          {sets.map((setIdx) => (
            <div
              key={`set-${setIdx}`}
              className="flex items-center gap-5 sm:gap-7 pr-5 sm:pr-7 shrink-0"
            >
              {photos.map((photo, localIdx) => {
                const actualPhotoIndex = globalStartIndex + localIdx;
                const photoDisplayNumber = String(actualPhotoIndex + 1).padStart(2, '0');

                return (
                  <div
                    key={`photo-${setIdx}-${photo.id || localIdx}`}
                    onClick={() => onPhotoClick && onPhotoClick(actualPhotoIndex)}
                    className="group/card relative w-[290px] sm:w-[420px] md:w-[540px] lg:w-[620px] aspect-[16/10] rounded-sm overflow-hidden bg-[#13131b] border border-white/[0.08] hover:border-gold-400/50 cursor-pointer shadow-xl shrink-0 transition-all duration-500"
                  >
                    {/* Image with slight scale & brightness on hover */}
                    <img
                      src={photo.url}
                      alt={photo.title || `Frame ${photoDisplayNumber}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 filter brightness-95 group-hover/card:brightness-105"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Subtle Cinematic Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/25 group-hover/card:via-transparent transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />

                    {/* Film Reel Frame Marks (Top) */}
                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-gold-400">
                        <span>FRAME {photoDisplayNumber}</span>
                        <span className="text-white/40">/ {String(photos.length).padStart(2, '0')}</span>
                      </div>

                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
                        BOX {boxNumber}
                      </span>
                    </div>

                    {/* Information Overlay (Bottom) */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between z-10">
                      <div>
                        <span className="text-[9px] font-mono tracking-[0.25em] text-gold-400 uppercase">
                          PHOTO {photoDisplayNumber}
                        </span>
                        <h4 className="font-editorial-luxury text-lg sm:text-2xl text-white tracking-wide mt-0.5 line-clamp-1">
                          {photo.title || 'Untitled Frame'}
                        </h4>
                        {photo.location && (
                          <p className="flex items-center gap-1.5 text-[11px] text-white/70 tracking-wider font-sans mt-0.5">
                            <MapPin className="w-3 h-3 text-gold-400" />
                            <span>{photo.location}</span>
                          </p>
                        )}
                      </div>

                      <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover/card:bg-gold-500 group-hover/card:text-black group-hover/card:scale-110 transition-all shadow-lg shrink-0">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Box Footer Bar */}
      <div className="px-5 sm:px-8 py-2 bg-[#07070a] border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono tracking-widest text-white/40">
        <div className="flex items-center gap-2">
          <Film className="w-3 h-3 text-gold-400" />
          <span>INDEPENDENT FILM STRIP • BOX {boxNumber}</span>
        </div>
        <span>CLICK ANY FRAME TO EXPAND</span>
      </div>
    </div>
  );
};
