
import React from 'react';
import { motion } from 'framer-motion';

interface TechnologySectionProps {
  onExplore?: () => void;
}

const TechnologySection: React.FC<TechnologySectionProps> = ({ onExplore }) => {
  return (
    <section className="min-h-screen relative flex items-center bg-[#0a0a0a] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
              RLTM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                SOFTWARE
              </span>
             </h2>
             <p className="text-xl text-gray-400 mb-8 max-w-lg">
                Rapid Live Tactical Mapping. Generate high-fidelity 2D orthomosaics and 3D point clouds from raw drone imagery in real-time.
             </p>
             
             <ul className="space-y-6">
                {[
                  "Instant 2D & 3D Map Generation",
                  "On-Edge Processing (No Cloud Required)",
                  "Sub-Centimeter Accuracy",
                  "Multi-Format Export (OBJ, LAS, TIFF)"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="flex items-center text-white font-medium"
                  >
                    <span className="w-2 h-2 bg-accluav-orange mr-4 rounded-full"></span>
                    {item}
                  </motion.li>
                ))}
             </ul>

             <button 
                onClick={onExplore}
                className="mt-12 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
             >
                Explore The Software
             </button>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 relative h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             {/* Abstract Representation of OS/UI */}
             <div className="absolute inset-0 bg-gray-900 border border-white/10 p-4 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
                  alt="RLTM Interface" 
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                
                {/* HUD Elements Overlay */}
                <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-accluav-orange/50"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-accluav-orange/50"></div>
                
                {/* Scanning Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] perspective-[500px] rotate-x-60"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   <div className="w-40 h-40 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <div className="w-32 h-32 border border-dashed border-white/40 rounded-full"></div>
                   </div>
                </div>
                
                {/* Floating Tags */}
                <div className="absolute top-1/4 right-1/4 bg-black/80 border border-white/20 p-2 text-xs font-mono text-accluav-orange">
                   ORTHO_PROCESS: ACTIVE
                </div>
                <div className="absolute bottom-1/3 left-1/4 bg-black/80 border border-white/20 p-2 text-xs font-mono text-green-500">
                   MAP_GEN: 3D_POINT_CLOUD
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
