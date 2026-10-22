import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { CategoryStory } from '../components/CategoryStory';
import { AboutSection } from '../components/AboutSection';
import { LetsConnect } from '../components/LetsConnect';
import { pageTransitionVariants } from '../animations/pageTransitions';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  useEffect(() => {
    // Refresh ScrollTrigger when home mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#09090b]"
    >
      {/* 1. Cinematic 3D Hero */}
      <Hero />

      {/* 2. Editorial Categories Section */}
      <CategorySection />

      {/* 3. Alternating Cinematic Category Stories */}
      <CategoryStory />

      {/* 4. Photographer Bio & Philosophy */}
      {/* <AboutSection /> */}

      {/* 5. Minimalist Luxury Let's Connect CTA */}
      <LetsConnect />
    </motion.div>
  );
};
