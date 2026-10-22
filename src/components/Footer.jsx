import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUp, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { InstagramIcon } from './SocialIcons';
import { SITE_CONFIG, openWhatsApp } from '../data/config';
import { useLenis } from '../hooks/useLenis';

export const Footer = () => {
  const { scrollTo } = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.6 });
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();

      const targetId = href.replace('/', '');

      if (location.pathname !== '/') {
        navigate('/');

        setTimeout(() => {
          scrollTo(targetId);
        }, 300);
      } else {
        scrollTo(targetId);
      }
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: "Let's Connect", href: '/#connect' },
  ];

  return (
    <footer className="relative w-full bg-[#050507] text-white pt-20 pb-12 px-4 sm:px-8 md:px-12 border-t border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto">

        {/* Top Tier: Logo, Navigation, Back to Top */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-16 border-b border-white/[0.08]">

          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="inline-block focus:outline-none">
              <span className="font-editorial-luxury text-2xl sm:text-3xl tracking-[0.25em] text-white">
                {SITE_CONFIG.studioName}
              </span>
            </Link>

            <p className="mt-1 text-xs tracking-widest text-white/50 font-sans uppercase">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs tracking-[0.2em] uppercase text-white/70 hover:text-gold-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={handleBackToTop}
            className="group self-start lg:self-center inline-flex items-center gap-2 text-xs tracking-[0.25em] text-white/60 hover:text-gold-400 uppercase transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>

            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-gold-400 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>

        {/* Bottom Tier: Socials & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Social Links */}
          <div className="flex items-center gap-5">

            {/* Instagram */}
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-gold-400 hover:border-gold-400 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* WhatsApp */}
            <button
              onClick={() => openWhatsApp()}
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-gold-400 hover:border-gold-400 transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>

            {/* Email */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-gold-400 hover:border-gold-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right text-[11px] tracking-wider text-white/40 font-light">
            © {new Date().getFullYear()} {SITE_CONFIG.studioName}. ALL RIGHTS RESERVED.
          </div>

        </div>
      </div>
    </footer>
  );
};
