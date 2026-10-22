import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates an editorial parallax scroll effect on an image or element
 */
export const initParallax = (element, speed = 0.2, trigger = null) => {
  if (!element) return null;
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Creates luxury curtain clip-path reveal for images
 */
export const initCurtainReveal = (element, delay = 0) => {
  if (!element) return null;
  gsap.set(element, {
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    scale: 1.15,
  });

  return gsap.to(element, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    duration: 1.4,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Text mask reveal (lines slide up smoothly from overflow hidden)
 */
export const initTextReveal = (elements, stagger = 0.08) => {
  if (!elements || elements.length === 0) return null;
  return gsap.fromTo(
    elements,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
};
