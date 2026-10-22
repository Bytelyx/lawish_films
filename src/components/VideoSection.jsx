import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VideoSection = ({ video, categoryTitle }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic reveal on viewport entry
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!video) return null;

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#060608] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Film className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-sans">
              MOTION PICTURES & CINEMATOGRAPHY
            </span>
          </div>
          <h2 className="font-editorial-luxury text-3xl sm:text-5xl tracking-wide uppercase">
            {video.title || `${categoryTitle} Highlight Film`}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/50 tracking-widest font-sans uppercase">
            {video.subtitle || 'Shot on Arri Alexa Mini LF & Vintage Cooke Optics'}
          </p>
        </div>

        {/* Video Frame */}
        <div
          ref={containerRef}
          className="relative aspect-video rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] bg-black group"
        >
          <video
            ref={videoRef}
            src={video.url}
            poster={video.poster}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play Button Overlay on Hover/Pause */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
              isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:scale-110 transition-all shadow-2xl">
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 translate-x-0.5" />
              )}
            </div>
          </div>

          {/* Video Control Bar at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-gold-400 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-gold-400 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {video.duration && (
                <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-white/70 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  {video.duration}
                </span>
              )}
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-gold-400 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
