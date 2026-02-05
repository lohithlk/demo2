
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Map, Cpu, ArrowRight } from 'lucide-react';

interface CapabilitiesProps {
  onSelectCategory: (category: 'defence' | 'geo' | 'software') => void;
}

const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'defence',
      title: 'DEFENCE',
      subtitle: 'KINETIC & ISR SYSTEMS',
      icon: <Shield className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1542255531-ad81881b2a95?auto=format&fit=crop&q=80', // Military/Drone texture
      description: 'Autonomous aerial platforms for kinetic engagement, surveillance, and air defense operations.'
    },
    {
      id: 'geo',
      title: 'GEOGRAPHICAL DATA',
      subtitle: 'MAPPING & SURVEYING',
      icon: <Map className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80', // Map/Topography
      description: 'High-fidelity geospatial data services, terrain analysis, and infrastructure surveying.'
    },
    {
      id: 'software',
      title: 'SOFTWARE',
      subtitle: 'MISSION CONTROL & AI',
      icon: <Cpu className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80', // Tech/Code
      description: 'Advanced mission planning, real-time tactical mapping (RLTM), and swarm orchestration.'
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h3 className="text-accluav-orange text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Core Competencies
          </h3>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white leading-[0.9]">
            CAPABILITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onClick={() => onSelectCategory(cat.id as any)}
              className="group relative h-[600px] border border-white/10 bg-gray-900 overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                 <div className="mb-auto">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6 group-hover:bg-accluav-orange group-hover:border-accluav-orange group-hover:text-black transition-colors duration-300">
                        {cat.icon}
                    </div>
                 </div>

                 <div>
                    <div className="text-accluav-orange text-xs font-bold uppercase tracking-widest mb-2">{cat.subtitle}</div>
                    <h3 className="text-4xl font-display font-bold mb-4">{cat.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {cat.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-accluav-orange transition-colors">
                        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
