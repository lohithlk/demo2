
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { getVideoUrl } from '../api-config';

const Hero: React.FC = () => {
  const title = "AccelUAV";
  const subtitle = "AUTONOMOUS AERIAL DOMINANCE";

  // Subtitle: Smooth fade in from top
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // Ultra-smooth easeOut
        delay: 0.2 
      } 
    }
  };

  // Title Container: Controls staggering
  const titleContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5, 
      },
    },
  };

  // Title Letter: Masked slide up
  const titleLetterVariants: Variants = {
    hidden: { y: "110%", opacity: 0 }, // Start fully below baseline
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1], // Cinematic deceleration
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background - Cinematic atmospheric video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-30 grayscale scale-105" // Slight scale to avoid edge artifacts
        >
          <source src={getVideoUrl('background-video.mp4')} type="video/mp4" />
        </video>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center relative">
          
          {/* Subtitle */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 md:mb-8"
          >
            <h2 className="text-accluav-orange text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              {subtitle}
            </h2>
          </motion.div>

          {/* Main Title - Masked Stagger Reveal */}
          <div className="overflow-hidden"> {/* Clipping container */}
            <motion.h1 
              className="text-7xl md:text-9xl lg:text-[13rem] font-display font-bold text-white leading-[0.8] tracking-tighter flex justify-center"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {title.split("").map((char, index) => (
                <div key={index} className="overflow-hidden inline-block pb-4 -mb-4"> {/* Individual character clip correction */}
                    <motion.span 
                        variants={titleLetterVariants} 
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                </div>
              ))}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
            className="mt-12 max-w-2xl text-lg md:text-xl text-gray-400 font-normal leading-relaxed"
          >
            Reimagining defense with software-defined hardware. We build <br className="hidden md:block"/>
            advanced autonomous systems for the modern era.
          </motion.p>
        </div>

        {/* Vertical Line Animation - Anchored to bottom */}
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '80px', opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
            className="absolute bottom-0 w-px bg-gradient-to-t from-white/50 to-transparent"
        />
      </div>
    </section>
  );
};

export default Hero;
