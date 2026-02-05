
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Radio, ArrowRight } from 'lucide-react';

interface SoftwareHubProps {
  onBack: () => void;
  onNavigateRLTM: () => void;
  onNavigateGCS: () => void;
}

const SoftwareHub: React.FC<SoftwareHubProps> = ({ onBack, onNavigateRLTM, onNavigateGCS }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 border-b border-white/10 pb-12"
        >
             <h1 className="text-5xl md:text-8xl font-display font-black uppercase mb-6">
                Software<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Suite</span>
             </h1>
             <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                The intelligence backbone of our autonomous systems. Select a platform to explore capabilities.
             </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* RLTM Card */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={onNavigateRLTM}
                className="group relative h-[600px] border border-white/10 bg-gray-900 overflow-hidden cursor-pointer"
            >
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
                        alt="RLTM" 
                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="w-16 h-16 bg-blue-600/20 backdrop-blur border border-blue-500/50 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Cpu className="w-8 h-8 text-blue-400 group-hover:text-white" />
                    </div>
                    <div className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">Rapid Live Tactical Mapping</div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">RLTM ENGINE</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">
                        Real-time 2D/3D map generation on the edge. No cloud required. Instant situational awareness.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                        View Product <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>

            {/* GCS Card */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={onNavigateGCS}
                className="group relative h-[600px] border border-white/10 bg-gray-900 overflow-hidden cursor-pointer"
            >
                 <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                        alt="GCS" 
                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="w-16 h-16 bg-purple-600/20 backdrop-blur border border-purple-500/50 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <Radio className="w-8 h-8 text-purple-400 group-hover:text-white" />
                    </div>
                    <div className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-2">Command & Control</div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">GROUND CONTROL</h2>
                    <p className="text-gray-300 mb-8 max-w-sm">
                        Universal mission planning and telemetry for multi-agent swarm operations.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                        View Product <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SoftwareHub;
