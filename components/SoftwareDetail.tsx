
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Layers, Share2, Zap, Globe, Lock, Box, List, Activity, Shield, Download } from 'lucide-react';

interface SoftwareDetailProps {
  onBack: () => void;
  onRequestDemo: () => void;
}

const SoftwareDetail: React.FC<SoftwareDetailProps> = ({ onBack, onRequestDemo }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
            
            {/* Left Column: Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-block border border-blue-500/50 px-3 py-1 text-blue-400 text-xs font-bold uppercase tracking-widest rounded bg-blue-500/10 mb-6">
                    SOFTWARE SUITE
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black leading-none mb-8 uppercase">
                    RLTM
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed mb-12">
                    The Rapid Time Tactical Mapping System is a transformative advancement in battlefield geospatial intelligence. It enables forces to generate live, high-resolution maps via <strong>off-board processing</strong> on the Ground Control Station. Operable in cloud-denied, GPS-denied, and EW-contested environments.
                </p>

                {/* Primary Specs */}
                <div className="mb-12">
                    <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Payload Weight</div>
                            <div className="text-xl font-mono font-bold text-white">1.5 KG</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Camera</div>
                            <div className="text-xl font-mono font-bold text-white">High Res Daylight</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Compute</div>
                            <div className="text-xl font-mono font-bold text-white">AI-Edge Embedded</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">GNSS</div>
                            <div className="text-xl font-mono font-bold text-white">CORS Corrected</div>
                        </div>
                    </div>
                </div>

                {/* Detailed Subsections */}
                <div className="space-y-12 mb-12">
                    <div>
                        <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-accluav-orange" />
                            Mapping Performance
                        </h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">10 CM GSD</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">100+ SQ KM / Flight</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">15 CM GSD</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">150+ SQ KM / Flight</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Processing</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">Off-board Real-Time</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-accluav-orange" />
                            Data Downlink
                        </h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Transmission</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">Live Sensor Stream</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Security</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">Encrypted to GCS</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Overlays</div>
                                <div className="text-base md:text-lg font-mono font-bold text-white">Intel Tags & Metadata</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={onRequestDemo}
                        className="flex-1 bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-colors"
                    >
                        Request License
                    </button>
                    <button className="px-6 border border-white/20 hover:bg-white/5 transition-colors text-white">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>

            {/* Right Column: Visuals */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                 <div className="sticky top-24">
                     {/* Image Container */}
                     <div className="aspect-square bg-gray-900 border border-white/10 relative overflow-hidden group">
                        <img 
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
                            alt="RLTM Interface" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        
                        {/* Decorative Overlay UI */}
                        <div className="absolute inset-0 pointer-events-none border border-white/5"></div>
                        <div className="absolute top-0 right-0 p-6 flex flex-col gap-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                        </div>
                        
                        {/* Fake UI Overlay */}
                        <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-black/80 backdrop-blur border border-white/20 p-4 font-mono text-xs">
                                    <div className="text-green-500 mb-1">SYS_STATUS: MAPPING (OFF-BOARD)</div>
                                    <div className="text-gray-400">GSD: 10 CM</div>
                                    <div className="text-gray-400">AREA: 45 SQ KM</div>
                                </div>
                            </div>
                            
                            <div className="bg-black/80 backdrop-blur border border-white/20 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-white">Live Reconstruction</h3>
                                    <span className="text-xs text-blue-400 animate-pulse">PROCESSING</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[64%]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 text-right">
                            <div className="text-[10px] font-mono text-gray-500">SW_VER</div>
                            <div className="text-xl font-mono font-bold text-white">RLTM v2.0</div>
                        </div>
                     </div>

                     {/* Additional Info Cards */}
                     <div className="grid grid-cols-3 gap-4 mt-4">
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Shield className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Secure Link</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Cpu className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Edge AI</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Zap className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Real-Time</div>
                         </div>
                     </div>
                 </div>
            </motion.div>
        </div>

        {/* Visual Sections */}
        <div className="space-y-32 pt-12 border-t border-white/10">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-center mb-24">
                Software Capabilities
            </h2>
            
            {/* Capability 1 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row gap-12 items-start"
            >
                <div className="lg:w-1/2 w-full">
                    <div className="aspect-[4/3] bg-gray-900 overflow-hidden relative border border-white/10 group">
                        <img 
                            src="https://images.unsplash.com/photo-1524813686514-a5756c97759e?auto=format&fit=crop&q=80" 
                            alt="Off-board Processing" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 uppercase">Off-board Processing</h3>
                    <div className="w-20 h-1 bg-blue-500 mb-8"></div>
                    <p className="text-gray-200 text-lg leading-relaxed mb-8 font-medium">
                        Proprietary geospatial processing software runs on the Ground Control Station, utilizing powerful edge computing to generate maps in real-time. This eliminates the weight and power constraints of onboard processing while maintaining superior accuracy.
                    </p>

                    <div className="border border-white/10 bg-white/5 rounded overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <tbody>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Environment</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Cloud / GPS Denied</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Integration</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Seamless Workflow</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Output</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Instant Map Generation</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>

            {/* Capability 2 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row-reverse gap-12 items-start"
            >
                <div className="lg:w-1/2 w-full">
                    <div className="aspect-[4/3] bg-gray-900 overflow-hidden relative border border-white/10 group">
                        <img 
                            src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80" 
                            alt="Data Downlink" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 uppercase">Real-Time Intelligence</h3>
                    <div className="w-20 h-1 bg-blue-500 mb-8"></div>
                    <p className="text-gray-200 text-lg leading-relaxed mb-8 font-medium">
                        Live downlink of sensor data and telemetry to the Ground Control Station (GCS). Empower commanders with unprecedented situational awareness for target acquisition, fire correction, and change detection.
                    </p>

                    <div className="border border-white/10 bg-white/5 rounded overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <tbody>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Targeting</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Real-Time Acquisition</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Analysis</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Change Detection</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">Security</td>
                                    <td className="py-3 px-4 text-white font-mono align-middle">Encrypted Stream</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SoftwareDetail;
