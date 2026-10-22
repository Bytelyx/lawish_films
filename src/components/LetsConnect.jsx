import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { SITE_CONFIG, openWhatsApp } from '../data/config';

export const LetsConnect = () => {
  return (
    <section
      id="connect"
      className="relative w-full py-32 sm:py-44 px-4 sm:px-8 md:px-12 bg-[#060608] text-white text-center overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-white/[0.03] border border-white/10">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.35em] text-gold-300 uppercase font-sans">
            CALENDAR RESERVATIONS & COMMISSIONS
          </span>
        </div>

        {/* Grand Headline */}
        <h2 className="font-editorial-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-[1.08]">
          LET'S CREATE <br />
          <span className="italic font-serif text-gold-300">SOMETHING BEAUTIFUL.</span>
        </h2>

        {/* Text */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/70 font-light max-w-xl leading-relaxed">
          Have a story worth remembering? Let's talk.
        </p>

        {/* Primary CTA: "LET'S CONNECT" -> WhatsApp */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={() => openWhatsApp()}
            className="group px-10 py-5 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase transition-all duration-400 flex items-center gap-3 shadow-[0_0_35px_rgba(197,168,128,0.35)] hover:shadow-[0_0_50px_rgba(197,168,128,0.6)] hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>LET'S CONNECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Secondary Details: Instagram, Email, Location */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-white/[0.08] w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Instagram */}
          <div className="flex flex-col items-center">
            <InstagramIcon className="w-4 h-4 text-gold-400 mb-2" />
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans">
              INSTAGRAM
            </span>
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs text-white/80 hover:text-gold-400 transition-colors tracking-wider"
            >
              @lawishfilms
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <Mail className="w-4 h-4 text-gold-400 mb-2" />
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans">
              DIRECT DISPATCH
            </span>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-1 text-xs text-white/80 hover:text-gold-400 transition-colors tracking-wider"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">
            <MapPin className="w-4 h-4 text-gold-400 mb-2" />
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans">
              ATELIER RESIDENCIES
            </span>
            <span className="mt-1 text-xs text-white/80 tracking-wider">
              {SITE_CONFIG.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
