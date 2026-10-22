import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Eye } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

export const CategoryStory = () => {
  const containerRef = useRef(null);
  const storyRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      storyRefs.current.forEach((storyEl) => {
        if (!storyEl) return;

        const imgWrapper = storyEl.querySelector('.story-img-wrapper');
        const img = storyEl.querySelector('.story-img');
        const content = storyEl.querySelector('.story-content');
        const badge = storyEl.querySelector('.story-badge');

        // Pin/Parallax scroll effect
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.15 },
            {
              yPercent: 10,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: storyEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        // Clip-path reveal for the image wrapper
        if (imgWrapper) {
          gsap.fromTo(
            imgWrapper,
            {
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              opacity: 0.6,
            },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              opacity: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: storyEl,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Typography fade & slide
        if (content) {
          gsap.fromTo(
            content.children,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: storyEl,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#060608] text-white overflow-hidden"
    >
      {/* Editorial Watermark */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <span className="text-[10px] tracking-[0.4em] text-gold-400 uppercase font-sans">
          CHAPTER BY CHAPTER
        </span>
        <h2 className="mt-3 font-editorial-luxury text-4xl sm:text-6xl tracking-wide uppercase">
          THE VISUAL ANTHOLOGY
        </h2>
        <div className="w-16 h-[1px] bg-gold-500/40 mx-auto mt-6" />
      </div>

      <div className="max-w-7xl mx-auto space-y-36 sm:space-y-44">
        {CATEGORIES.map((cat, index) => {
          // Layout alternation according to specification:
          // Wedding (idx 0): Left image, Right text
          // Intimate (idx 1): Right image, Left text
          // Lifestyle (idx 2): Left image, Right text
          // Party (idx 3): Right image, Left text
          // Maternity (idx 4): Left image, Right text
          const imageOnLeft = index % 2 === 0;

          return (
            <div
              key={cat.id}
              ref={(el) => (storyRefs.current[index] = el)}
              className={`flex flex-col ${
                imageOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-7/12">
                <div className="story-img-wrapper relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#121218] group">
                  <img
                    src={cat.heroImage}
                    alt={cat.title}
                    loading="lazy"
                    className="story-img w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Story Tag */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.3em] font-mono text-gold-400 bg-black/60 px-3 py-1.5 backdrop-blur-md rounded-full border border-white/10">
                      CHAPTER {cat.number}
                    </span>
                    <span className="hidden sm:inline-block text-[11px] tracking-[0.2em] text-white/80 font-editorial-luxury uppercase">
                      {cat.quoteAuthor.split('—')[1] || 'FINE ART ARCHIVE'}
                    </span>
                  </div>

                  {/* Floating View Icon overlay */}
                  <Link
                    to={`/category/${cat.id}`}
                    className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-gold-400 hover:scale-110 transition-all"
                    aria-label={`View ${cat.title} gallery`}
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Text Side */}
              <div className="story-content w-full lg:w-5/12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-[0.35em] text-gold-400 font-mono">
                    CATEGORY {cat.number}
                  </span>
                  <span className="w-8 h-[1px] bg-gold-400/50" />
                </div>

                <h3 className="font-editorial-luxury text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-white leading-tight">
                  {cat.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm tracking-[0.2em] text-gold-300/80 uppercase font-sans">
                  {cat.subtitle}
                </p>

                <p className="mt-6 text-sm sm:text-base text-white/70 leading-relaxed font-light">
                  {cat.fullDescription}
                </p>

                {/* Short Package Preview Card */}
                <div className="mt-8 p-6 rounded-sm bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="text-[11px] tracking-[0.25em] text-gold-400 font-semibold uppercase">
                      {cat.package.tier}
                    </span>
                    <span className="text-base sm:text-lg font-serif text-white font-medium">
                      {cat.package.price}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    <li className="flex items-center gap-2 text-xs text-white/80 tracking-wide">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{cat.package.duration}</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/80 tracking-wide">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{cat.package.photographers}</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/80 tracking-wide">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{cat.package.editedPhotos}</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/80 tracking-wide">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{cat.package.album}</span>
                    </li>
                  </ul>
                </div>

                {/* View Package CTA */}
                <div className="mt-8">
                  <Link
                    to={`/category/${cat.id}`}
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold-400/50 bg-gold-400/10 hover:bg-gold-400 text-gold-300 hover:text-black transition-all duration-400 text-xs tracking-[0.25em] font-semibold uppercase group cursor-pointer shadow-[0_0_20px_rgba(197,168,128,0.12)] hover:shadow-[0_0_25px_rgba(197,168,128,0.4)]"
                  >
                    <span>VIEW PACKAGE</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
