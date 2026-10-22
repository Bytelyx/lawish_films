import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ThreeHeroBackground } from './ThreeHeroBackground';
import { useLenis } from '../hooks/useLenis';
import { CATEGORIES } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const centerImageRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const topLeftCardRef = useRef(null);
  const bottomRightCardRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for scroll-driven 3D depth experience
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          // end: '+=50%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Central Image zooms forward into cinematic dominance
      tl.to(
        centerImageRef.current,
        {
          scale: 1.22,
          y: -20,
          filter: 'brightness(0.9)',
          ease: 'power1.inOut',
        },
        0
      );

      // 2. Peripheral images fly outward in 3D perspective with rotation
      tl.to(
        leftCardRef.current,
        {
          x: -160,
          y: -90,
          rotationZ: -12,
          rotationY: -15,
          scale: 0.85,
          opacity: 0,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        rightCardRef.current,
        {
          x: 170,
          y: -80,
          rotationZ: 14,
          rotationY: 18,
          scale: 0.85,
          opacity: 0,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        topLeftCardRef.current,
        {
          x: -120,
          y: -140,
          rotationZ: -6,
          scale: 0.7,
          opacity: 0,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        bottomRightCardRef.current,
        {
          x: 130,
          y: 120,
          rotationZ: 8,
          scale: 0.7,
          opacity: 0,
          ease: 'power2.out',
        },
        0
      );

      // 3. Headline text glides upward and expands slightly
      tl.to(
        headlineRef.current,
        {
          y: -110,
          opacity: 0.15,
          letterSpacing: '0.12em',
          scale: 1.05,
          ease: 'power2.inOut',
        },
        0
      );

      // 4. Subtitle & CTA fade cleanly
      tl.to(
        [subtitleRef.current, ctaRef.current],
        {
          y: -40,
          opacity: 0,
          ease: 'power2.in',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    scrollTo('#categories');
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#09090b] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Three.js 3D Background */}
      <ThreeHeroBackground />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/80 z-10 pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(9,9,11,0.92)_85%)] z-10 pointer-events-none" />

      {/* Main 3D Layered Images Canvas */}
      <div
        ref={heroWrapperRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer: Centerpiece Master Photograph */}
        <div
          ref={centerImageRef}
          className="relative w-[86vw] sm:w-[72vw] md:w-[54vw] lg:w-[42vw] max-w-[620px] aspect-[4/5] rounded-sm overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/[0.12] transition-transform duration-700"
          style={{ willChange: 'transform' }}
        >
          <img
            src={CATEGORIES[0].heroImage}
            alt="Cinematic Wedding Hero"
            className="w-full h-full object-cover brightness-90 contrast-[1.08] filter" loading="eager" fetchPriority="high" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Layer: Floating Top-Left Accent */}
        <div
          ref={topLeftCardRef}
          className="hidden lg:block absolute left-[6%] top-[12%] w-[18vw] max-w-[210px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/10 opacity-75 backdrop-blur-sm -rotate-3"
          style={{ willChange: 'transform' }}
        >
          <img
            src={CATEGORIES[1].heroImage}
            alt="Intimate Art Preview"
            className="w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <span className="absolute bottom-3 left-3 text-[9px] tracking-[0.25em] text-gold-300/80 uppercase font-sans">
            02 • INTIMATE
          </span>
        </div>

        {/* Layer: Floating Mid-Left Accent */}
        <div
          ref={leftCardRef}
          className="hidden md:block absolute left-[3%] bottom-[16%] w-[20vw] max-w-[240px] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-white/10 opacity-80 rotate-2"
          style={{ willChange: 'transform' }}
        >
          <img
            src={CATEGORIES[2].heroImage}
            alt="Lifestyle Preview"
            className="w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <span className="absolute bottom-3 left-3 text-[9px] tracking-[0.25em] text-gold-300/80 uppercase font-sans">
            03 • LIFESTYLE
          </span>
        </div>

        {/* Layer: Floating Top-Right Accent */}
        <div
          ref={rightCardRef}
          className="hidden md:block absolute right-[4%] top-[14%] w-[20vw] max-w-[230px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/10 opacity-80 rotate-3"
          style={{ willChange: 'transform' }}
        >
          <img
            src={CATEGORIES[4].heroImage}
            alt="Maternity Preview"
            className="w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <span className="absolute bottom-3 left-3 text-[9px] tracking-[0.25em] text-gold-300/80 uppercase font-sans">
            05 • MATERNITY
          </span>
        </div>

        {/* Layer: Floating Bottom-Right Accent */}
        <div
          ref={bottomRightCardRef}
          className="hidden lg:block absolute right-[6%] bottom-[14%] w-[19vw] max-w-[220px] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-white/10 opacity-75 -rotate-2"
          style={{ willChange: 'transform' }}
        >
          <img
            src={CATEGORIES[3].heroImage}
            alt="Party Revelry Preview"
            className="w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <span className="absolute bottom-3 left-3 text-[9px] tracking-[0.25em] text-gold-300/80 uppercase font-sans">
            04 • PARTY
          </span>
        </div>
      </div>

      {/* Layer: Cinematic Editorial Headline & Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Editorial Subtitle Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08]"
        >
        </motion.div>

        {/* Grand Headline */}
        <h1
          ref={headlineRef}
          className="font-editorial-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] text-white leading-[1.06] uppercase max-w-4xl drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          <span className="block font-light">WE CAPTURE</span>
          <span className="block italic font-serif text-gold-300/90">
            THE MOMENTS
          </span>
          <span className="block font-light">YOU'LL NEVER</span>
          <span className="block tracking-[0.14em]">FORGET.</span>
        </h1>

        {/* Subtitle Services List */}
        <p
          ref={subtitleRef}
          className="mt-6 sm:mt-8 text-[11px] sm:text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-sans max-w-2xl px-2"
        >
          WEDDING • INTIMATE • LIFESTYLE • PARTY • MATERNITY
        </p>

        {/* Call to Action Button */}
        <div
          ref={ctaRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleExploreClick}
            className="group relative px-8 py-3.5 rounded-full bg-white text-black hover:bg-gold-400 transition-all duration-400 text-xs tracking-[0.25em] font-semibold uppercase flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] cursor-pointer"
          >
            <span>EXPLORE STORIES</span>

            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={handleExploreClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-[9px] tracking-[0.35em] text-white/50 uppercase font-sans">
          SCROLL TO EXPLORE
        </span>

        <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 via-gold-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
};