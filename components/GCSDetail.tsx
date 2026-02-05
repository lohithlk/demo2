
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Crosshair, Wifi, Laptop, Download } from 'lucide-react';

interface GCSDetailProps {
  onBack: () => void;
  onRequestDemo: () => void;
}

const GCSDetail: React.FC<GCSDetailProps> = ({ onBack, onRequestDemo }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Software
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
            
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-block border border-purple-500/50 px-3 py-1 text-purple-400 text-xs font-bold uppercase tracking-widest rounded bg-purple-500/10 mb-6">
                    COMMAND SUITE
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black leading-none mb-8 uppercase">
                    GROUND CONTROL<br/>STATION
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed mb-12">
                    The AccelUAV GCS is a unified interface for planning, executing, and monitoring autonomous missions. Built on an open architecture, it supports single-pilot swarm control, complex waypoint navigation, and real-time payload management.
                </p>

                <div className="mb-12">
                    <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4">Core Features</h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Multi-Agent</div>
                            <div className="text-xl font-mono font-bold text-white">Swarm Ready</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Protocol</div>
                            <div className="text-xl font-mono font-bold text-white">MAVLink V2</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Encryption</div>
                            <div className="text-xl font-mono font-bold text-white">AES-256</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Platform</div>
                            <div className="text-xl font-mono font-bold text-white">Windows / Linux</div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={onRequestDemo}
                        className="flex-1 bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-colors"
                    >
                        Request Demo
                    </button>
                    <button className="px-6 border border-white/20 hover:bg-white/5 transition-colors text-white">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                 <div className="sticky top-24">
                     <div className="aspect-[4/3] bg-gray-900 border border-white/10 relative overflow-hidden group">
                        <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                            alt="GCS Interface" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        
                        {/* Fake UI Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex justify-between w-full">
                                <div className="bg-black/80 backdrop-blur border border-purple-500/30 p-2 text-[10px] font-mono text-purple-400">
                                    LINK_STATUS: CONNECTED (100%)
                                </div>
                                <div className="bg-black/80 backdrop-blur border border-white/10 p-2 text-[10px] font-mono text-white">
                                    BATTERY: 84%
                                </div>
                            </div>
                            <div className="self-center border border-white/20 p-4 bg-black/50 rounded-full">
                                <Crosshair className="w-12 h-12 text-white/50" />
                            </div>
                            <div className="w-full h-32 bg-black/80 backdrop-blur border-t border-white/20 p-4">
                                <div className="text-[10px] font-bold text-gray-500 mb-2">TELEMETRY LOG</div>
                                <div className="font-mono text-[10px] text-green-500 space-y-1">
                                    <div>{'>'}  WP_1 REACHED</div>
                                    <div>{'>'}  HEADING 240</div>
                                    <div>{'>'}  ALT 120M</div>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-4 mt-4">
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Wifi className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Long Range</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Laptop className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Portable</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Radio className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Encrypted</div>
                         </div>
                     </div>
                 </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GCSDetail;
