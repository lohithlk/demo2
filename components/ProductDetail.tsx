
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Download, Shield, Cpu, Activity, List, Layers, Camera, Radio, Settings } from 'lucide-react';
import { Product } from '../types';

const ModelViewer = 'model-viewer' as any;

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onRequestInfo: () => void;
  onViewPayloads?: () => void; // Added optional prop
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onRequestInfo, onViewPayloads }) => {
  const [modelFailed, setModelFailed] = useState(false);
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
            {/* Left Column: Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-block border border-accluav-orange/50 px-3 py-1 text-accluav-orange text-xs font-bold uppercase tracking-widest rounded bg-accluav-orange/5 mb-6">
                    {product.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black leading-none mb-8 uppercase">
                    {product.title}
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed mb-12">
                    {product.description}
                </p>
                {/* ...existing code... */}
                {!product.details && product.specs && (
                    <div className="mb-12">
                        <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                            {product.specs.map((spec, index) => (
                                <div key={index}>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">{spec.label}</div>
                                    <div className="text-xl font-mono font-bold text-white">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* ...existing code... */}
                {product.details && (
                    <div className="space-y-12 mb-12">
                        {product.details.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                                    <List className="w-4 h-4 text-accluav-orange" />
                                    {section.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                    {section.items.map((item, i) => (
                                        <div key={i}>
                                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">{item.label}</div>
                                            <div className="text-base md:text-lg font-mono font-bold text-white">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* ...existing code... */}
                {product.features && (
                    <div className="mb-12">
                         <h3 className="text-lg font-bold font-display uppercase mb-6 border-b border-white/10 pb-4">Core Capabilities</h3>
                         <ul className="space-y-4">
                             {product.features.map((feature, i) => (
                                 <li key={i} className="flex items-start gap-4">
                                     <div className="w-1.5 h-1.5 bg-accluav-orange rounded-full mt-2.5 flex-shrink-0"></div>
                                     <span className="text-gray-200 font-medium">{feature}</span>
                                 </li>
                             ))}
                         </ul>
                    </div>
                )}
                {/* ...existing code... */}
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <button 
                            onClick={onRequestInfo}
                            className="flex-1 bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors"
                        >
                            Request Datasheet
                        </button>
                        <button className="px-6 border border-white/20 hover:bg-white/5 transition-colors text-white">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                    {/* Special Button for ACE-IV Payload Page */}
                    {product.id === '02' && onViewPayloads && (
                        <button 
                            onClick={onViewPayloads}
                            className="w-full py-4 border border-accluav-orange/50 text-accluav-orange font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <Settings className="w-4 h-4" /> View Payload Configurations
                        </button>
                    )}
                </div>
            </motion.div>
            {/* Right Column: Visuals (Model Viewer + Video) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                 <div className="sticky top-24">
                     {/* 3D Model / Image Container */}
                     <div className="aspect-square relative overflow-hidden group">
                        {product.modelUrl && !modelFailed ? (
                            <>
                                <ModelViewer
                                    src={product.modelUrl}
                                    camera-controls
                                    auto-rotate
                                    rotation-per-second="30deg"
                                    shadow-intensity="1"
                                    camera-orbit="45deg 55deg 2.5m"
                                    environment-image="neutral"
                                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                                    onError={() => setModelFailed(true)}
                                >
                                </ModelViewer>
                                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur px-3 py-1 text-xs font-bold text-white border border-white/10 rounded flex items-center gap-2">
                                    <Box className="w-3 h-3 text-accluav-orange" /> INTERACTIVE VIEW
                                </div>
                            </>
                        ) : (
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        )}
                        {/* Decorative Overlay UI */}
                        <div className="absolute top-0 right-0 p-6 flex flex-col gap-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-6 right-6 text-right">
                            <div className="text-[10px] font-mono text-gray-500">SYS_ID</div>
                            <div className="text-xl font-mono font-bold text-white">{product.id}</div>
                        </div>
                     </div>
                     {/* Video Section: Always below 3D model, only if videoUrl exists */}
                     {product.videoUrl && (
                        <div className="mt-8 aspect-video relative overflow-hidden rounded-lg border border-white/10 bg-black">
                            <video
                                src={product.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                className="w-full h-full object-cover"
                                style={{ background: 'black' }}
                            />
                        </div>
                     )}
                     {/* Additional Info Cards */}
                     <div className="grid grid-cols-3 gap-4 mt-4">
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Shield className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Defense Grade</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Cpu className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">AI Enabled</div>
                         </div>
                         <div className="bg-white/5 p-4 border border-white/10 text-center">
                             <Activity className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                             <div className="text-[10px] uppercase tracking-widest text-gray-500">Field Proven</div>
                         </div>
                     </div>
                 </div>
            </motion.div>
        </div>
        {/* ...existing code... */}
        {product.visualSections && (
            <div className="space-y-32 pt-12 border-t border-white/10">
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-center mb-24">
                    Platform Capabilities
                </h2>
                {product.visualSections.map((section, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col ${section.layout === 'text-right' ? 'lg:flex-row-reverse' : section.layout === 'text-left' ? 'lg:flex-row' : ''} gap-12 items-start`}
                    >
                        {section.layout !== 'full' ? (
                            <>
                                <div className="lg:w-1/2 w-full">
                                    <div className="aspect-[4/3] bg-gray-900 overflow-hidden relative border border-white/10 group">
                                        <img 
                                            src={section.imageUrl} 
                                            alt={section.title} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div className="absolute top-4 right-4 text-accluav-orange">
                                            {section.title.toLowerCase().includes('camera') ? <Camera className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 uppercase">{section.title}</h3>
                                    <div className="w-20 h-1 bg-accluav-orange mb-8"></div>
                                    <p className="text-gray-200 text-lg leading-relaxed mb-8 font-medium">
                                        {section.description}
                                    </p>
                                    {/* Specifications Table */}
                                    {section.specs && (
                                        <div className="border border-white/10 bg-white/5 rounded overflow-hidden">
                                            <table className="w-full text-sm text-left">
                                                <tbody>
                                                    {section.specs.map((spec, i) => (
                                                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                            <td className="py-3 px-4 text-gray-300 font-bold text-xs uppercase tracking-wider border-r border-white/5 w-1/3 align-middle">{spec.label}</td>
                                                            <td className="py-3 px-4 text-white font-mono align-middle">{spec.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full">
                                <div className="mb-8 text-center max-w-4xl mx-auto">
                                     <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 uppercase">{section.title}</h3>
                                     <p className="text-gray-200 text-lg leading-relaxed font-medium">{section.description}</p>
                                </div>
                                <div className="aspect-[21/9] bg-gray-900 overflow-hidden relative border border-white/10 group w-full mb-12">
                                     <img 
                                        src={section.imageUrl} 
                                        alt={section.title} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
                                     />
                                     {/* HUD Overlay for Real-Time Data Sections */}
                                     <div className="absolute inset-0 pointer-events-none">
                                         <div className="absolute top-8 left-8 border-l-2 border-t-2 border-accluav-orange w-8 h-8"></div>
                                         <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-accluav-orange w-8 h-8"></div>
                                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                             <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center">
                                                 <div className="w-1 h-1 bg-accluav-orange rounded-full"></div>
                                             </div>
                                         </div>
                                         <div className="absolute top-8 right-8 flex items-center gap-2 text-xs font-mono text-accluav-orange bg-black/50 px-2 py-1">
                                             <Radio className="w-3 h-3 animate-pulse" /> LIVE_FEED
                                         </div>
                                     </div>
                                </div>
                                {/* Full Width Specs Grid */}
                                {section.specs && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {section.specs.map((spec, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-6">
                                                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">{spec.label}</div>
                                                <div className="text-lg font-mono text-white font-bold">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        )}
        {/* ...existing code... */}
      </div>
    </div>
  );
};

export default ProductDetail;
