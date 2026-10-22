import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

export const CategorySection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#09090b] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gold-400" />

            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase">
              DISCIPLINES & EXPERIENCES
            </span>

            <span className="w-8 h-[1px] bg-gold-400" />
          </div>

          <h2 className="font-editorial-luxury text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] uppercase">
            STORIES WE CAPTURE
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-xs sm:text-sm text-white/50 leading-relaxed">
            Explore our curated photography experiences, each crafted with
            an artistic eye and timeless editorial approach.
          </p>
        </div>

        {/* Horizontal Category Cards */}
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">

          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              ref={(el) => (cardsRef.current[index] = el)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                group
                relative
                flex-shrink-0
                w-[280px]
                sm:w-[310px]
                lg:w-[calc(20%-16px)]
                snap-start
                overflow-hidden
                rounded-xl
                border
                border-white/[0.08]
                bg-[#0e0e13]
                hover:border-gold-400/40
                transition-all
                duration-500
              "
            >

              {/* Image */}
              <div className="relative h-[300px] sm:h-[330px] overflow-hidden">

                <img
                  src={cat.editorialImage || cat.heroImage}
                  alt={cat.title}
                  loading="lazy"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Number */}
                <div className="absolute top-4 left-4">
                  <span className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-black/50
                    backdrop-blur-md
                    border
                    border-white/10
                    text-[10px]
                    tracking-[0.2em]
                    text-white/80
                  ">
                    {cat.number}
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="
                    font-editorial-luxury
                    text-2xl
                    sm:text-3xl
                    uppercase
                    tracking-wide
                    text-white
                    group-hover:text-gold-300
                    transition-colors
                    duration-300
                  ">
                    {cat.title}
                  </h3>

                  {/* <p className="
                    mt-1
                    text-[9px]
                    tracking-[0.25em]
                    uppercase
                    text-gold-400
                  ">
                    {cat.subtitle}
                  </p> */}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">

                <p className="
                  text-xs
                  text-white/55
                  leading-relaxed
                  line-clamp-3
                  min-h-[54px]
                ">
                  {cat.shortDescription}
                </p>

                {/* Learn More */}
                <Link
                  to={`/category/${cat.id}`}
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    w-full
                    pt-4
                    border-t
                    border-white/[0.08]
                    text-[10px]
                    tracking-[0.25em]
                    uppercase
                    font-medium
                    text-white/80
                    hover:text-gold-400
                    transition-colors
                  "
                >
                  <span>Learn More</span>

                  <span className="
                    w-8
                    h-8
                    rounded-full
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    group-hover:border-gold-400
                    group-hover:bg-gold-400/10
                    transition-all
                    duration-300
                  ">
                    <ArrowUpRight
                      className="
                        w-4
                        h-4
                        group-hover:text-gold-400
                        group-hover:rotate-45
                        transition-all
                        duration-300
                      "
                    />
                  </span>
                </Link>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};