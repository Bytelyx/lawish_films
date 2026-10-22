import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG, openWhatsApp } from '../data/config';
import { useLenis } from '../hooks/useLenis';
import Logo from '../assets/hero.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, item) => {
    if (item.href.startsWith('/#')) {
      e.preventDefault();

      const targetId = item.href.replace('/', '');

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
    { label: 'HOME', href: '/' },
    { label: 'CATEGORIES', href: '/#categories' },
    { label: 'GALLERY', href: '/gallery' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-8 md:px-12 py-4 ${
          isScrolled
            ? 'py-3 sm:py-3.5 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* =====================================================
              DESKTOP / MAIN LOGO
          ===================================================== */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus:outline-none"
          >
            
            <img
              src={Logo}
              alt="Lawish Films"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Logo Name */}
            <div className="flex flex-col items-start">
              <span className="font-editorial-luxury text-xl sm:text-2xl tracking-[0.2em] text-white font-normal group-hover:text-gold-400 transition-colors">
                LAWISH FILMS
              </span>

              <span className="text-[9px] tracking-[0.35em] text-white/50 -mt-0.5 uppercase font-sans">
                PHOTOGRAPHY
              </span>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? location.pathname === '/' && !location.hash
                  : location.pathname === link.href;

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-[11px] tracking-[0.25em] font-medium transition-all duration-300 relative py-1 hover:text-white ${
                    isActive ? 'text-gold-400' : 'text-white/70'
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* =====================================================
              DESKTOP CONNECT BUTTON
          ===================================================== */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => openWhatsApp()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full border border-gold-500/40 bg-gold-500/10 hover:bg-gold-500 hover:border-gold-500 text-gold-300 hover:text-black text-[11px] tracking-[0.22em] font-semibold uppercase transition-all duration-400 flex items-center gap-2 shadow-[0_0_20px_rgba(197,168,128,0.12)] hover:shadow-[0_0_25px_rgba(197,168,128,0.4)]"
            >
              <FaWhatsapp className="w-4 h-4 transition-transform group-hover:scale-110" />

              <span>LET'S CONNECT</span>

              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* =====================================================
              MOBILE HEADER
          ===================================================== */}
          <div className="flex md:hidden items-center gap-3">

            {/* Mobile WhatsApp */}
            <button
              onClick={() => openWhatsApp()}
              className="p-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300"
              aria-label="Connect on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE DRAWER MENU
      ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-7 text-center">

              {/* =================================================
                  MOBILE LOGO + NAME
              ================================================= */}
              <div className="flex flex-col items-center mb-3">

                {/* Logo */}
                <img
                  src={Logo}
                  alt="Lavish Schools"
                  className="w-20 h-20 object-contain mb-4"
                />

                {/* Name */}
                <h2 className="font-editorial-luxury text-2xl tracking-[0.18em] text-white">
                  LAVISH SCHOOLS
                </h2>

                <span className="mt-1 text-[9px] tracking-[0.35em] text-white/40 uppercase">
                  {SITE_CONFIG.studioName}
                </span>

              </div>

              {/* Navigation Label */}
              <span className="text-[10px] tracking-[0.4em] text-gold-400/80 uppercase">
                NAVIGATION
              </span>

              {/* Mobile Navigation Links */}
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * idx,
                    duration: 0.3,
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="font-editorial-luxury text-3xl tracking-widest text-white/90 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Connect */}
              <div className="pt-6 border-t border-white/10 flex flex-col items-center">

                <button
                  onClick={() => openWhatsApp()}
                  className="w-full max-w-xs py-3.5 rounded-full bg-gold-500 text-black text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4" />

                  <span>LET'S CONNECT ON WHATSAPP</span>
                </button>

                <p className="mt-4 text-[10px] tracking-widest text-white/40">
                  {SITE_CONFIG.location}
                </p>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};