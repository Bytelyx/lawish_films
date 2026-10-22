import React from 'react';
import { motion } from 'framer-motion';
import { Award, Camera, Film, Heart, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, openWhatsApp } from '../data/config';
import { LetsConnect } from '../components/LetsConnect';
import { pageTransitionVariants } from '../animations/pageTransitions';
import { AboutSection } from '../components/AboutSection';

export const About = () => {
  const steps = [
    {
      step: '01',
      title: 'THE DISCOVERY & CONSULTATION',
      desc: 'We begin with an unhurried conversation—typically over WhatsApp or espresso—to understand your aesthetic values, story, and unwritten dreams.',
    },
    {
      step: '02',
      title: 'CREATIVE MOODBOARDING',
      desc: 'We curate bespoke lighting references, wardrobe palettes, location studies, and custom film grain profiles matched to your energy.',
    },
    {
      step: '03',
      title: 'THE BESPOKE COMMISSION',
      desc: 'On the day, we blend seamless documentary observation with haute couture direction, putting you completely at ease while crafting timeless art.',
    },
    {
      step: '04',
      title: 'THE HEIRLOOM UNVEILING',
      desc: 'Delivered through an exclusive private online cloud vault, accompanied by bespoke handcrafted Italian leather or linen archival heirloom volumes.',
    },
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#09090b] text-white pt-32 sm:pt-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              ATELIER PHILOSOPHY
            </span>
            <span className="w-8 h-[1px] bg-gold-400" />
          </div>

          <h1 className="font-editorial-luxury text-5xl sm:text-7xl md:text-8xl tracking-wide uppercase">
            THE ARTISTS
          </h1>

          <p className="mt-4 font-serif italic text-xl sm:text-2xl text-gold-300/90 max-w-2xl mx-auto">
            "To photograph someone is to hold a mirror to their most poetic, unrepeatable essence."
          </p>
        </div>

        {/* Split Section: Portraits & Narrative */}
        <AboutSection />

        {/* The 4-Step Client Journey */}
        <div className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              THE EXPERIENCE
            </span>
            <h3 className="font-editorial-luxury text-3xl sm:text-4xl uppercase text-white mt-1">
              THE COMMISSION PROCESS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-8 rounded-sm bg-gradient-to-b from-[#121218] to-[#0c0c10] border border-white/10 hover:border-gold-400/40 transition-colors shadow-lg relative"
              >
                <span className="text-2xl font-mono text-gold-400 font-light">
                  {st.step}
                </span>
                <h4 className="font-editorial-luxury text-lg text-white uppercase mt-4 mb-2 tracking-wide">
                  {st.title}
                </h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Let's Connect Section */}
      <LetsConnect />
    </motion.div>
  );
};
