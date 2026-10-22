import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Compass, Camera, Sparkles } from 'lucide-react';
import { SITE_CONFIG, openWhatsApp } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on photographer portrait
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current.querySelector('img'),
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Staggered reveal for text content
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#09090b] text-white overflow-hidden border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Photographer Portrait with Gold Accent Frame (5 cols) */}
          <div className="lg:col-span-5 relative" ref={imageRef}>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-[#121218] group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200"
                alt="Elena Vance - Principal Photographer"
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.05] grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Floating Name Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-black/60 backdrop-blur-md border border-white/10">
                <p className="font-editorial-luxury text-xl text-white tracking-wide">
                  Elena Vance
                </p>
                <p className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-sans mt-0.5">
                  Principal Artist & Creative Director
                </p>
              </div>
            </div>

            {/* Subtle decorative offset border */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-full h-full border border-gold-500/20 -z-10 rounded-sm pointer-events-none" />
          </div>

          {/* Right: Biography, Philosophy & Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center" ref={contentRef}>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-gold-400" />
              <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
                THE PERSON BEHIND THE LENS
              </span>
            </div>

            <h2 className="font-editorial-luxury text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase leading-tight">
              CRAFTING TIMELESS <br />
              <span className="italic font-serif text-gold-300">HEIRLOOMS OF LIGHT.</span>
            </h2>

            {/* Philosophy quote */}
            <blockquote className="mt-6 pl-4 border-l-2 border-gold-400/60 font-serif italic text-lg sm:text-xl text-white/90 leading-relaxed">
              "We do not manufacture moments. We wait patiently, attuned to human emotion, for light and soul to align in a singular, unrepeatable breath."
            </blockquote>

            <p className="mt-6 text-sm text-white/70 leading-relaxed font-light">
              Trained in classical fine arts at the École Nationale des Beaux-Arts in Paris before transitioning to editorial cinema, Elena Vance has spent the past twelve years documenting the world’s most intimate weddings, celebrations, and portrait chronicles. Her work is celebrated for its quiet grace, tactile grain, and deep cinematic emotional resonance.
            </p>

            {/* Key stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
              {SITE_CONFIG.stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-editorial-luxury text-2xl sm:text-3xl text-gold-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-wider text-white/50 uppercase font-sans mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Editorial Features / Press Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3 font-sans">
                FEATURED IN LEADING EDITORIAL JOURNALS
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-serif tracking-widest text-white/70 uppercase">
                {SITE_CONFIG.press.slice(0, 4).map((p, idx) => (
                  <span key={idx} className="hover:text-gold-400 transition-colors">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            {/* <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs tracking-[0.25em] font-semibold text-white uppercase hover:text-gold-400 transition-colors group"
              >
                <span>READ FULL BIOGRAPHY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <span className="text-white/20 hidden sm:inline">•</span>

              <button
                onClick={() => openWhatsApp('Hello Elena, I would love to connect and learn more about your philosophy.')}
                className="text-xs tracking-[0.25em] font-semibold text-gold-400 uppercase hover:text-white transition-colors"
              >
                SPEAK DIRECTLY VIA WHATSAPP
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
