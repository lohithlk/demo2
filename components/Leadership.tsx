import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { Leader } from '../types';

interface LeadershipProps {
  onBack: () => void;
  leaders: Leader[];
}

const Leadership: React.FC<LeadershipProps> = ({ onBack, leaders }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white selection:bg-accluav-orange selection:text-white pt-24">
      <div className="container mx-auto px-6 py-12">
         {/* Page Title */}
         <div className="mb-24 border-b border-white/10 pb-12">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-display font-black uppercase leading-[0.85] tracking-tighter"
            >
                Command <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-gray-900">Structure</span>
            </motion.h1>
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {leaders.map((leader, index) => (
               <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group"
               >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden mb-8 border border-white/10">
                      <img 
                        src={leader.imageUrl} 
                        alt={leader.name} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                      />
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-accluav-orange transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-accluav-orange transition-colors"></div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                          <span className="text-xs font-bold text-accluav-orange uppercase tracking-widest">
                            {index < 9 ? `0${index + 1}` : index + 1}
                          </span>
                          <Linkedin className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                      </div>
                      
                      <h3 className="text-3xl font-display font-bold uppercase leading-none group-hover:text-white transition-colors">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                        {leader.role}
                      </p>
                      
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                          <p className="pt-6 text-gray-500 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {leader.bio}
                          </p>
                      </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Bottom Manifesto */}
         <div className="mt-40 pt-20 border-t border-white/10 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">The Philosophy</h4>
            </div>
            <div className="md:w-2/3">
                <p className="text-2xl md:text-3xl font-display leading-tight text-white/80">
                    "We are not just engineers and operators. We are builders who believe that the future of defense requires a fundamental shift in how we approach hardware, software, and strategy."
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Leadership;