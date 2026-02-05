
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Map as MapIcon, FileCode, Video, Image as ImageIcon, Box } from 'lucide-react';
import { Payload } from '../types';

// Use 'any' to bypass TS check for custom element instead of augmenting global JSX namespace
const ModelViewer = 'model-viewer' as any;

interface PayloadDetailProps {
  onBack: () => void;
  payloads: Payload[];
}

const PayloadDetail: React.FC<PayloadDetailProps> = ({ onBack, payloads }) => {
  const [activeTab, setActiveTab] = useState<'surveillance' | 'mapping'>('surveillance');

  const surveillancePayloads = payloads.filter(p => p.type === 'surveillance');
  const mappingPayloads = payloads.filter(p => p.type === 'mapping');

  // New state for mapping sub-selection
  const [selectedMappingId, setSelectedMappingId] = useState<string | null>(null);

  // Set initial selected mapping payload if not set and options exist
  React.useEffect(() => {
      if (mappingPayloads.length > 0 && !selectedMappingId) {
          setSelectedMappingId(mappingPayloads[0].id);
      }
  }, [mappingPayloads, selectedMappingId]);

  const activeMappingPayload = mappingPayloads.find(p => p.id === selectedMappingId) || mappingPayloads[0];

  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-12 transition-colors text-xs font-bold uppercase tracking-widest"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to ACE-IV System
        </button>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 border-b border-white/10 pb-12"
        >
            <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">ACE-IV Modular Payloads</span>
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase mb-6">
                Mission<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Config</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                Swappable payload modules for long-range ISR and high-fidelity photogrammetry.
            </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-8 mb-16 border-b border-white/10">
            <button
                onClick={() => setActiveTab('surveillance')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'surveillance' ? 'text-accluav-orange' : 'text-gray-500 hover:text-white'}`}
            >
                Surveillance Camera
                {activeTab === 'surveillance' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accluav-orange" />
                )}
            </button>
            <button
                onClick={() => setActiveTab('mapping')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'mapping' ? 'text-accluav-orange' : 'text-gray-500 hover:text-white'}`}
            >
                Mapping Camera
                {activeTab === 'mapping' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accluav-orange" />
                )}
            </button>
        </div>

        <AnimatePresence mode="wait">
            {activeTab === 'surveillance' ? (
                <motion.div
                    key="surveillance"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="mb-32"
                >
                    <h2 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
                        <Target className="w-8 h-8 text-accluav-orange" /> Surveillance Configuration
                    </h2>
                    
                    {surveillancePayloads.length === 0 && (
                        <div className="text-gray-500 italic">No surveillance payloads configured.</div>
                    )}

                    {surveillancePayloads.map(payload => (
                        <div key={payload.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24 last:mb-0">
                            {/* Content */}
                            <div>
                                {payload.manufacturer && (
                                    <div className="inline-block border border-white/20 px-3 py-1 text-white text-xs font-bold uppercase tracking-widest rounded mb-6">
                                        {payload.manufacturer}
                                    </div>
                                )}
                                <h3 className="text-5xl font-display font-bold mb-6 uppercase">{payload.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {payload.description}
                                </p>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {payload.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-4">
                                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{spec.label}</div>
                                            <div className="text-xl font-mono font-bold">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-accluav-orange rounded-full"></div> GEO-LOCK & Tracking</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-accluav-orange rounded-full"></div> Video Processing & Stabilization</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-accluav-orange rounded-full"></div> Object Tracking (Moving Target)</li>
                                </ul>
                            </div>

                            {/* Media Grid */}
                            <div className="space-y-6">
                                {/* 3D Model Viewer - If URL exists */}
                                {payload.modelUrl ? (
                                    <div className="aspect-square relative overflow-hidden group">
                                        <ModelViewer
                                            src={payload.modelUrl}
                                            camera-controls
                                            auto-rotate
                                            rotation-per-second="30deg"
                                            shadow-intensity="1"
                                            environment-image="neutral"
                                            alt={`3D model of ${payload.title}`}
                                            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                                        >
                                        </ModelViewer>
                                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-xs font-bold text-white border border-white/10 rounded flex items-center gap-2">
                                            <Box className="w-3 h-3 text-accluav-orange" /> INTERACTIVE 3D
                                        </div>
                                    </div>
                                ) : (
                                    /* Image Fallback if no model */
                                    <div className="aspect-square bg-gray-900 border border-white/10 relative overflow-hidden group">
                                        <img 
                                            src={payload.imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80"} 
                                            className="absolute inset-0 w-full h-full object-cover" 
                                            alt={payload.title} 
                                        />
                                        <div className="absolute bottom-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product Image</div>
                                    </div>
                                )}

                                {/* Placeholder for Video Feed */}
                                <div className="aspect-video bg-gray-900 border border-white/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <Video className="w-12 h-12 text-gray-700 mb-4" />
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Stabilization Demo Video</span>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-red-600 px-2 py-1 text-[10px] font-bold uppercase rounded text-white">Live Feed Rec</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    key="mapping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
                        <MapIcon className="w-8 h-8 text-accluav-orange" /> Mapping Camera Options
                    </h2>

                    {/* Mapping Sub-Navigation Buttons */}
                    <div className="flex flex-wrap gap-4 mb-16">
                        {mappingPayloads.map(payload => (
                            <button
                                key={payload.id}
                                onClick={() => setSelectedMappingId(payload.id)}
                                className={`px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-all ${
                                    selectedMappingId === payload.id 
                                    ? 'bg-accluav-orange border-accluav-orange text-white' 
                                    : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                                }`}
                            >
                                {payload.title}
                            </button>
                        ))}
                    </div>

                    {mappingPayloads.length === 0 && (
                        <div className="text-gray-500 italic">No mapping payloads configured.</div>
                    )}

                    {activeMappingPayload && (
                        <motion.div 
                            key={activeMappingPayload.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                        >
                            {/* Left Column: Details */}
                            <div>
                                <h3 className="text-5xl font-display font-bold mb-6 uppercase">
                                    {activeMappingPayload.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {activeMappingPayload.description}
                                </p>
                                
                                {/* Specs Mini-Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {activeMappingPayload.specs.map((spec, i) => (
                                        <div key={i} className="border border-white/10 p-4 bg-white/5">
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{spec.label}</div>
                                            <div className="text-xl font-mono font-bold text-white">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Data Artifacts Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <DataAssetCard type="video" label="Sensor Stream" />
                                    <DataAssetCard type="obj" label="3D Asset" />
                                    <DataAssetCard type="tiff" label="GeoTIFF" />
                                    <DataAssetCard type="ortho" label="Orthomosaic" />
                                </div>
                            </div>

                            {/* Right Column: 3D Model */}
                            <div className="w-full">
                                {activeMappingPayload.modelUrl ? (
                                    <div className="aspect-square relative overflow-hidden group border border-white/10 bg-black/20">
                                        <ModelViewer
                                            src={activeMappingPayload.modelUrl}
                                            camera-controls
                                            auto-rotate
                                            rotation-per-second="30deg"
                                            shadow-intensity="1"
                                            environment-image="neutral"
                                            alt={`3D model of ${activeMappingPayload.title}`}
                                            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                                        >
                                        </ModelViewer>
                                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-xs font-bold text-white border border-white/10 rounded flex items-center gap-2">
                                            <Box className="w-3 h-3 text-accluav-orange" /> 3D MODEL
                                        </div>
                                    </div>
                                ) : (
                                    <div className="aspect-square bg-gray-900 border border-white/10 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-gray-700" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const DataAssetCard: React.FC<{ type: 'video' | 'obj' | 'tiff' | 'ortho', label: string }> = ({ type, label }) => {
    const getIcon = () => {
        switch(type) {
            case 'video': return <Video className="w-8 h-8 text-accluav-orange" />;
            case 'obj': return <Box className="w-8 h-8 text-blue-400" />;
            case 'tiff': return <ImageIcon className="w-8 h-8 text-green-400" />;
            case 'ortho': return <MapIcon className="w-8 h-8 text-purple-400" />;
        }
    };

    return (
        <div className="aspect-square bg-[#111] border border-white/10 flex flex-col items-center justify-center p-4 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden">
            <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {getIcon()}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">{label}</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <FileCode className="w-4 h-4 text-gray-600" />
            </div>
        </div>
    );
};

export default PayloadDetail;
