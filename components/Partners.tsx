
import React from 'react';
import { motion } from 'framer-motion';
import { Partner } from '../types';

interface PartnersProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <section className="py-32 bg-accluav-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Our Partners <span className="text-gray-500">Say About Us</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl">
          Trusted by defense agencies and first responders to deliver mission-critical autonomous capabilities.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-accluav-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-accluav-black to-transparent z-10"></div>
        
        {partners.length > 0 && (
            <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 40 
            }}
            style={{ width: "fit-content" }}
            >
            {/* Duplicate list to create seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
                <div 
                key={`${partner.id}-${index}`} 
                className="w-[400px] md:w-[600px] h-[350px] bg-[#111] border border-white/10 p-10 flex-shrink-0 whitespace-normal flex flex-col justify-between hover:border-accluav-orange/30 transition-colors group relative"
                >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex-grow">
                    {partner.logoUrl ? (
                        <div className="h-12 mb-8 flex items-center">
                            <img 
                                src={partner.logoUrl} 
                                alt={partner.company} 
                                className="h-full w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0" 
                            />
                        </div>
                    ) : (
                        <h3 className="text-xs font-bold text-accluav-orange uppercase tracking-[0.2em] mb-8">
                            {partner.company}
                        </h3>
                    )}
                    <p className="text-xl md:text-2xl font-display leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                    "{partner.quote}"
                    </p>
                </div>
                
                <div className="w-12 h-1 bg-white/10 mt-8 group-hover:w-full group-hover:bg-accluav-orange transition-all duration-500"></div>
                </div>
            ))}
            </motion.div>
        )}
        
        {partners.length === 0 && (
             <div className="container mx-auto px-6 text-gray-500 italic">No partners listed currently.</div>
        )}
      </div>
    </section>
  );
};

export default Partners;
