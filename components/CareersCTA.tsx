
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CareersCTAProps {
  onRequestDemo: () => void;
  onViewOpenRoles?: () => void;
  onViewLife?: () => void;
}

const CareersCTA: React.FC<CareersCTAProps> = ({ onRequestDemo, onViewOpenRoles, onViewLife }) => {
  return (
    <section id="careers" className="py-32 bg-[#050505] border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.9]"
          >
            BUILD THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accluav-orange to-red-600">
              FUTURE OF DEFENSE
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl"
          >
            We are looking for engineers, designers, and operators who are ready to solve the hardest problems in national security.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row gap-6 flex-wrap"
          >
            <button 
              onClick={onViewOpenRoles}
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
            >
              View Open Roles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={onViewLife}
                className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              Life at AccelUAV
            </button>
            <button 
              onClick={onRequestDemo}
              className="px-8 py-4 border border-accluav-orange text-accluav-orange font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-all duration-300"
            >
              Request Demo
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Background Graphic */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-900 to-transparent opacity-20 pointer-events-none" />
      <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-accluav-orange/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default CareersCTA;
