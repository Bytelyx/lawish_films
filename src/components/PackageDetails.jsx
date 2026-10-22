import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, Users, Camera, BookOpen, Video, ArrowUpRight } from 'lucide-react';
import { openWhatsApp } from '../data/config';

export const PackageDetails = ({ category }) => {
  if (!category || !category.package) return null;

  const pkg = category.package;

  const handleInquire = () => {
    openWhatsApp(
      `Hello Elena, I am interested in inquiring about the ${category.title} photography package (${pkg.tier} - ${pkg.price}). Could you please share date availability?`
    );
  };

  const keySpecs = [
    { icon: Clock, label: 'SESSION DURATION', value: pkg.duration },
    { icon: Users, label: 'MASTER ARTISTS', value: pkg.photographers },
    { icon: Camera, label: 'DELIVERED RETOUCHED', value: pkg.editedPhotos },
    { icon: BookOpen, label: 'HEIRLOOM ALBUM', value: pkg.album },
    { icon: Video, label: 'CINEMA HIGHLIGHT', value: pkg.video ? 'Included in 4K' : 'Optional Add-on' },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#09090b] text-white border-t border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              INVESTMENT & CURATION
            </span>
            <span className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-editorial-luxury text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase">
            {category.title} COLLECTION
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-white/60 tracking-wider font-light">
            Every session is treated as a bespoke artistic commission with complete transparency,
            fine-art retouching, and museum-grade physical heirlooms.
          </p>
        </div>

        {/* Editorial Luxury Layout (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Price & Key Metrics (5 cols) */}
          <div className="lg:col-span-5 rounded-sm p-8 sm:p-10 bg-gradient-to-b from-[#121218] to-[#0c0c10] border border-white/10 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            <span className="text-[10px] tracking-[0.3em] font-mono text-gold-400 uppercase">
              {pkg.tier}
            </span>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-editorial-luxury text-5xl sm:text-6xl text-white tracking-tight">
                {pkg.price}
              </span>
              <span className="text-xs text-white/40 tracking-widest font-mono">
                / {pkg.altPrice}
              </span>
            </div>

            <p className="mt-3 text-xs text-white/60 font-light leading-relaxed">
              All taxes, creative direction, master color science grading, and digital print release included.
            </p>

            {/* Key Specs Breakdown */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
              {keySpecs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gold-400 shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-sans">
                        {spec.label}
                      </div>
                      <div className="text-xs sm:text-sm text-white/90 font-medium mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inquire Button */}
            <div className="mt-10 pt-6 border-t border-white/[0.08]">
              <button
                onClick={handleInquire}
                className="w-full py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs tracking-[0.25em] font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(197,168,128,0.3)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] cursor-pointer"
              >
                <span>RESERVE THIS DATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-center text-[10px] tracking-wider text-white/40 font-sans">
                Direct WhatsApp consultation with Elena Vance
              </p>
            </div>
          </div>

          {/* Right Column: Features & Studio Archival Pledge (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-editorial-luxury text-2xl sm:text-3xl text-white tracking-wide uppercase mb-6">
                WHAT IS INCLUDED IN YOUR COMMISSION
              </h3>

              <div className="space-y-4">
                {pkg.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-sm bg-white/[0.02] border border-white/[0.06] hover:border-gold-400/30 transition-colors flex items-start gap-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5 text-gold-400">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Archival Assurance Pledge */}
            <div className="mt-8 p-6 rounded-sm bg-[#101016] border border-white/10 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs tracking-[0.25em] text-gold-300 font-semibold uppercase">
                  THE LUMINA ARCHIVAL GUARANTEE
                </h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed font-light">
                  All albums are handcrafted using 100% acid-free museum cotton rag paper and pigment-based archival inks guaranteed not to fade for over 100 years. Raw cloud archives are retained across dual redundancy vaults for 10 full years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
