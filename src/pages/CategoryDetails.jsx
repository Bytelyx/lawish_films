import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';
import { CATEGORIES, getCategoryById } from '../data/categories';
import { PackageDetails } from '../components/PackageDetails';
import { GalleryGrid } from '../components/GalleryGrid';
import { VideoSection } from '../components/VideoSection';
import { LetsConnect } from '../components/LetsConnect';
import { pageTransitionVariants } from '../animations/pageTransitions';
import { useLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const { scrollTo } = useLenis();

  const category = getCategoryById(id || 'wedding');

  // Handle invalid category
  useEffect(() => {
    if (!category) {
      navigate('/category/wedding', { replace: true });
    }
  }, [category, navigate]);

  // Find next category for smooth journey
  const currentIndex = CATEGORIES.findIndex((c) => c.id === category?.id);
  const nextCategory = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Hero parallax zoom
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 20,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [id]);

  if (!category) return null;

  return (
    <motion.div
      key={category.id}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#09090b] text-white"
    >
      {/* 1. Fullscreen Cinematic Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full h-[92vh] sm:h-screen overflow-hidden flex items-end justify-start pb-20 sm:pb-28 px-4 sm:px-8 md:px-16"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            ref={heroImageRef}
            src={category.heroImage}
            alt={category.title}
            className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.08] scale-105"
            loading="eager"
            fetchPriority="high"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl">
          {/* Back button */}
          <Link
            to="/#categories"
            className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.25em] text-white/70 hover:text-gold-400 uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL DISCIPLINES</span>
          </Link>

          {/* Number & Subtitle */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-[0.3em] text-gold-400">
              {category.number} / 05
            </span>
            <span className="w-8 h-[1px] bg-gold-400/60" />
            <span className="text-xs tracking-[0.25em] text-white/80 uppercase font-sans">
              {category.subtitle}
            </span>
          </div>

          {/* Category Main Title */}
          <h1 className="font-editorial-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.95] text-white">
            {category.title}
          </h1>

          {/* Cinematic Tagline */}
          <p className="mt-4 sm:mt-6 font-serif italic text-xl sm:text-2xl md:text-3xl text-gold-300/95 max-w-3xl leading-snug">
            "{category.heroHeadline}"
          </p>

          <p className="mt-4 text-xs sm:text-sm text-white/70 font-light max-w-2xl leading-relaxed">
            {category.fullDescription}
          </p>
        </div>
      </section>

      {/* 2. Client Testimonial Banner */}
      {category.quote && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 border-b border-white/[0.08] bg-[#0c0c11]">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-8 h-8 text-gold-400/40 mx-auto mb-4" />
            <p className="font-serif italic text-lg sm:text-2xl text-white/90 leading-relaxed">
              "{category.quote}"
            </p>
            <p className="mt-4 text-[11px] tracking-[0.25em] text-gold-400 uppercase font-sans">
              {category.quoteAuthor}
            </p>
          </div>
        </section>
      )}

      {/* 3. Luxury Package Details Section */}
      <PackageDetails category={category} />

      {/* 4. Cinematic Video Highlight Section */}
      {category.video && (
        <VideoSection video={category.video} categoryTitle={category.title} />
      )}

      {/* 5. Photo Story / Cinematic Gallery (15-20 images) */}
      <GalleryGrid
        images={category.images}
        title={`${category.title} CHRONICLES`}
        subtitle="Every frame a singular moment frozen in eternity"
      />

      {/* 6. Seamless Journey to Next Category */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#060608] border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-10 sm:p-14 rounded-sm bg-gradient-to-r from-[#121218] to-[#0c0c10] border border-white/10 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              NEXT CHAPTER • {nextCategory.number}
            </span>
            <h3 className="font-editorial-luxury text-3xl sm:text-5xl uppercase text-white mt-1">
              DISCOVER {nextCategory.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/60 font-light max-w-lg">
              {nextCategory.shortDescription}
            </p>
          </div>

          <Link
            to={`/category/${nextCategory.id}`}
            className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-gold-400 transition-all duration-300 text-xs tracking-[0.25em] font-semibold uppercase group-hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] shrink-0"
          >
            <span>VIEW {nextCategory.title}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Background next category subtle image watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
            <img
              src={nextCategory.heroImage}
              alt=""
              className="w-full h-full object-cover filter grayscale"
            />
          </div>
        </div>
      </section>

      {/* 7. Let's Connect CTA */}
      <LetsConnect />
    </motion.div>
  );
};
