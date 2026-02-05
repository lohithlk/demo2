
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Map, Globe, Layers, Database, ArrowRight, Box, Calculator, Check, Info, Plus } from 'lucide-react';
import { PricingModel } from '../types';

// Type definition for custom element to avoid TS errors
const ModelViewer = 'model-viewer' as any;

interface GeographicalDataProps {
  onBack: () => void;
  onRequestService: () => void;
  mapSource?: string | null;
  pricingModel?: PricingModel;
}

type ServiceType = '3d_twin' | 'ortho' | 'point_cloud' | 'spectral' | 'all' | 'custom';
type PointCloudType = 'low' | 'lidar';
type SpectralType = 'multi' | 'hyper';

const GeographicalData: React.FC<GeographicalDataProps> = ({ onBack, onRequestService, mapSource, pricingModel }) => {
  const [viewMode, setViewMode] = useState<'satellite' | '3d'>('3d');
  
  // Pricing State
  const [hectares, setHectares] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<ServiceType>('3d_twin');
  const [pointCloudType, setPointCloudType] = useState<PointCloudType>('low');
  const [spectralType, setSpectralType] = useState<SpectralType>('multi');
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  
  // Custom Build State
  const [customServices, setCustomServices] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');
  
  // Breakdown for 'ALL' and 'Custom' packages
  const [bundleBreakdown, setBundleBreakdown] = useState<{label: string, price: number}[]>([]);

  const services = [
    {
        title: 'Topographic Surveys',
        description: 'High-precision contour mapping and digital elevation models (DEM) for engineering and construction.',
        icon: <Map className="w-6 h-6" />
    },
    {
        title: '3D City Modeling',
        description: 'Photorealistic digital twins of urban environments for smart city planning and simulation.',
        icon: <Globe className="w-6 h-6" />
    },
    {
        title: 'Infrastructure Inspection',
        description: 'Automated defect detection and thermal analysis for pipelines, power lines, and bridges.',
        icon: <Layers className="w-6 h-6" />
    },
    {
        title: 'GIS Integration',
        description: 'Seamless integration of aerial data into standard GIS platforms (ArcGIS, QGIS) with metadata.',
        icon: <Database className="w-6 h-6" />
    }
  ];

  // Default fallback if pricingModel not passed (prevents crashes)
  const defaultTiers = {
      '3d_twin': [], 'ortho': [], 'point_cloud_low': [], 'point_cloud_lidar': [], 'spectral_multi': [], 'spectral_hyper': []
  };
  const tiers = pricingModel || defaultTiers;

  const getActiveTiers = () => {
      if (selectedService === 'custom') {
          // Flatten all selected tiers for display
          let allTiers: any[] = [];
          if (customServices.includes('3d_twin')) allTiers = [...allTiers, { header: '3D Digital Twin' }, ...(tiers['3d_twin'] || [])];
          if (customServices.includes('ortho')) allTiers = [...allTiers, { header: 'Orthomosaic' }, ...(tiers['ortho'] || [])];
          if (customServices.includes('point_cloud')) {
              const t = pointCloudType === 'low' ? tiers['point_cloud_low'] : tiers['point_cloud_lidar'];
              allTiers = [...allTiers, { header: `Point Cloud (${pointCloudType})` }, ...(t || [])];
          }
          if (customServices.includes('spectral')) {
              const t = spectralType === 'multi' ? tiers['spectral_multi'] : tiers['spectral_hyper'];
              allTiers = [...allTiers, { header: `Spectral (${spectralType})` }, ...(t || [])];
          }
          return allTiers;
      }

      if (selectedService === '3d_twin') return tiers['3d_twin'] || [];
      if (selectedService === 'ortho') return tiers['ortho'] || [];
      if (selectedService === 'point_cloud') return pointCloudType === 'low' ? tiers['point_cloud_low'] : tiers['point_cloud_lidar'] || [];
      if (selectedService === 'spectral') return spectralType === 'multi' ? tiers['spectral_multi'] : tiers['spectral_hyper'] || [];
      return [];
  };

  const toggleCustomService = (service: string) => {
      setCustomServices(prev => 
          prev.includes(service) 
              ? prev.filter(s => s !== service) 
              : [...prev, service]
      );
  };

  // Pricing Logic
  useEffect(() => {
    if (hectares <= 0) {
        setCalculatedPrice(0);
        setDiscountedPrice(0);
        setBundleBreakdown([]);
        return;
    }

    const getRate = (ha: number, tierList: any[]) => {
        if (!tierList || tierList.length === 0) return 0;
        for (const tier of tierList) {
            if (ha < tier.limit) return tier.rate;
        }
        return tierList[tierList.length - 1].rate;
    };

    let total = 0;

    if (selectedService === 'all') {
        // Bundle Calculation
        const p1 = hectares * getRate(hectares, tiers['3d_twin']);
        const p2 = hectares * getRate(hectares, tiers['ortho']);
        const p3 = hectares * getRate(hectares, tiers['point_cloud_lidar']);
        const p4 = hectares * getRate(hectares, tiers['spectral_hyper']);
        
        setBundleBreakdown([
            { label: '3D Digital Twin', price: p1 },
            { label: 'Orthomosaic / Report', price: p2 },
            { label: 'LiDAR Point Cloud', price: p3 },
            { label: 'Hyperspectral Imaging', price: p4 },
        ]);

        const grossTotal = p1 + p2 + p3 + p4;
        setCalculatedPrice(grossTotal);
        setDiscountedPrice(Math.round(grossTotal * 0.7)); // 30% Off
    } else if (selectedService === 'custom') {
        // Custom Calculation
        let customTotal = 0;
        const newBreakdown: {label: string, price: number}[] = [];

        if (customServices.includes('3d_twin')) {
            const cost = hectares * getRate(hectares, tiers['3d_twin']);
            customTotal += cost;
            newBreakdown.push({ label: '3D Digital Twin', price: cost });
        }
        if (customServices.includes('ortho')) {
            const cost = hectares * getRate(hectares, tiers['ortho']);
            customTotal += cost;
            newBreakdown.push({ label: 'Orthomosaic / Report', price: cost });
        }
        if (customServices.includes('point_cloud')) {
            const t = pointCloudType === 'low' ? tiers['point_cloud_low'] : tiers['point_cloud_lidar'];
            const cost = hectares * getRate(hectares, t);
            customTotal += cost;
            newBreakdown.push({ label: `Point Cloud (${pointCloudType})`, price: cost });
        }
        if (customServices.includes('spectral')) {
            const t = spectralType === 'multi' ? tiers['spectral_multi'] : tiers['spectral_hyper'];
            const cost = hectares * getRate(hectares, t);
            customTotal += cost;
            newBreakdown.push({ label: `Spectral (${spectralType})`, price: cost });
        }

        setBundleBreakdown(newBreakdown);
        setCalculatedPrice(customTotal);
        setDiscountedPrice(0);
    } else {
        // Single Selection
        const activeTiers = getActiveTiers();
        if (activeTiers.length > 0) {
            total = hectares * getRate(hectares, activeTiers);
        }
        setCalculatedPrice(total);
        setDiscountedPrice(0);
    }

  }, [hectares, selectedService, pointCloudType, spectralType, customServices, tiers]);

  // Helper to check if a row should be highlighted
  const isRowActive = (tier: any, tierList: any[]) => {
      if (selectedService === 'custom' || selectedService === 'all') return false;
      if (!hectares || hectares <= 0) return false;
      
      // Find index of this tier in the list
      const index = tierList.indexOf(tier);
      if (index === -1) return false;

      // Find the index that SHOULD be active
      let activeIndex = -1;
      for (let i = 0; i < tierList.length; i++) {
          if (hectares < tierList[i].limit) {
              activeIndex = i;
              break;
          }
      }
      // If none matched, it's the last one
      if (activeIndex === -1) activeIndex = tierList.length - 1;

      return index === activeIndex;
  };

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
                Geographical<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Data Services</span>
             </h1>
             <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                Beyond hardware, AccelUAV provides comprehensive geospatial data solutions. We deploy our fleet to capture, process, and deliver centimeter-accurate intelligence.
             </p>
        </motion.div>

        {/* Interactive Data Sample Viewer */}
        <div className="w-full h-[600px] relative overflow-hidden mb-20 group">
            {/* UI Overlay / Controls */}
            <div className="absolute top-0 left-0 z-20 w-full p-6 flex flex-col md:flex-row justify-between items-start pointer-events-none">
                <div className="mb-4 md:mb-0">
                   <div className="inline-flex items-center gap-2 bg-accluav-orange/20 border border-accluav-orange/50 text-accluav-orange px-3 py-1 text-xs font-bold uppercase tracking-widest mb-2 backdrop-blur-sm">
                        <Box className="w-3 h-3" /> Interactive Sample
                   </div>
                   <h2 className="text-3xl font-display font-bold text-white drop-shadow-md">Terrain Point Cloud</h2>
                </div>
                
                <div className="pointer-events-auto flex gap-2 bg-black/50 p-1 rounded backdrop-blur-md border border-white/10">
                    <button 
                       onClick={() => setViewMode('satellite')}
                       className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm ${viewMode === 'satellite' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Satellite View
                    </button>
                    <button 
                       onClick={() => setViewMode('3d')}
                       className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-sm ${viewMode === '3d' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        3D Mesh
                    </button>
                </div>
            </div>

            {/* View Content */}
            {viewMode === '3d' ? (
                <div className="w-full h-full bg-[#050505] relative">
                    <ModelViewer
                        src="/3d-model/odm_textured_model_geo.glb"
                        camera-controls
                        auto-rotate
                        rotation-per-second="30deg"
                        shadow-intensity="1"
                        camera-orbit="45deg 55deg 4m"
                        environment-image="neutral"
                        alt="3D Terrain Map Sample"
                        style={{ width: '100%', height: '100%' }}
                    >
                    </ModelViewer>
                    <div className="absolute bottom-6 right-6 z-20 pointer-events-none text-right">
                         <div className="text-[10px] text-gray-500 font-mono">ASSET_ID</div>
                         <div className="text-xl text-white font-mono font-bold">MAP_SAMPLE_04</div>
                         <div className="text-xs text-green-500 font-mono mt-1">VERTS: 2.4M • HIGH_FIDELITY</div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
                        alt="Topography" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
            )}
        </div>

        {/* PRICING CALCULATOR */}
        <div className="mb-24 bg-[#111] border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-accluav-orange" /> Processing Sheet
                </h3>
                <span className="text-xs text-gray-500 font-mono">ESTIMATION ENGINE V1.0</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left Column: Inputs & Selection */}
                <div className="p-8 border-r border-white/10 lg:col-span-2 space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Area Coverage</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                min="0" 
                                value={hectares || ''} 
                                onChange={(e) => setHectares(parseFloat(e.target.value))}
                                className="w-full bg-black/50 border border-white/20 p-4 text-white text-xl font-mono focus:border-accluav-orange outline-none transition-colors"
                                placeholder="Enter Hectares..." 
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">HA</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Service Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { id: '3d_twin', label: '3D Digital Twin' },
                                { id: 'ortho', label: 'Orthomosaic / Report' },
                                { id: 'point_cloud', label: 'Point Cloud' },
                                { id: 'spectral', label: 'Spectral Imaging' },
                                { id: 'all', label: 'All-In-One Bundle' },
                                { id: 'custom', label: 'Custom Build' }
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedService(s.id as ServiceType)}
                                    className={`p-4 border text-left transition-all ${selectedService === s.id 
                                        ? 'bg-white text-black border-white' 
                                        : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                    }`}
                                >
                                    <div className="font-bold text-sm uppercase tracking-wider">{s.label}</div>
                                    {s.id === 'all' && <div className="text-[10px] text-accluav-orange font-bold mt-1">SAVE 30%</div>}
                                    {s.id === 'custom' && <div className="text-[10px] text-blue-400 font-bold mt-1">BUILD YOUR OWN</div>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sub-Options (Shared & Custom) */}
                    <AnimatePresence>
                        {/* Point Cloud Density Options */}
                        {(selectedService === 'point_cloud' || (selectedService === 'custom' && customServices.includes('point_cloud'))) && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Point Cloud Density</label>
                                <div className="flex gap-4">
                                    <button onClick={() => setPointCloudType('low')} className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest ${pointCloudType === 'low' ? 'bg-accluav-orange text-white border-accluav-orange' : 'border-white/20 text-gray-400'}`}>Low Density</button>
                                    <button onClick={() => setPointCloudType('lidar')} className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest ${pointCloudType === 'lidar' ? 'bg-accluav-orange text-white border-accluav-orange' : 'border-white/20 text-gray-400'}`}>LiDAR (High Density)</button>
                                </div>
                            </motion.div>
                        )}
                        {/* Spectral Options */}
                        {(selectedService === 'spectral' || (selectedService === 'custom' && customServices.includes('spectral'))) && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 overflow-hidden">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sensor Type</label>
                                <div className="flex gap-4">
                                    <button onClick={() => setSpectralType('multi')} className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest ${spectralType === 'multi' ? 'bg-accluav-orange text-white border-accluav-orange' : 'border-white/20 text-gray-400'}`}>Multispectral</button>
                                    <button onClick={() => setSpectralType('hyper')} className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest ${spectralType === 'hyper' ? 'bg-accluav-orange text-white border-accluav-orange' : 'border-white/20 text-gray-400'}`}>Hyperspectral</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Custom Build UI */}
                    <AnimatePresence>
                        {selectedService === 'custom' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-white/10 pt-8 mt-8">
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">Select Modules to Include</h4>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {[
                                        { id: '3d_twin', label: '3D Digital Twin' },
                                        { id: 'ortho', label: 'Orthomosaic' },
                                        { id: 'point_cloud', label: 'Point Cloud' },
                                        { id: 'spectral', label: 'Spectral Imaging' }
                                    ].map(service => (
                                        <button 
                                            key={service.id}
                                            onClick={() => toggleCustomService(service.id)}
                                            className={`p-4 border flex items-center justify-between group transition-colors ${customServices.includes(service.id) ? 'bg-white/10 border-accluav-orange text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                        >
                                            <span className="text-sm font-bold uppercase">{service.label}</span>
                                            {customServices.includes(service.id) ? <Check className="w-4 h-4 text-accluav-orange" /> : <Plus className="w-4 h-4 group-hover:text-white" />}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Mission Requirements / Notes</label>
                                    <textarea 
                                        rows={3}
                                        value={customNotes}
                                        onChange={(e) => setCustomNotes(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 p-3 text-white text-sm focus:border-accluav-orange outline-none resize-none"
                                        placeholder="Describe specific outputs, coordinate systems, or delivery formats..."
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: Quote Summary */}
                <div className="p-8 bg-white/5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-display font-bold mb-6">Quote Summary</h4>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Area</span>
                                <span className="font-mono font-bold">{hectares || 0} HA</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Service</span>
                                <span className="font-mono font-bold uppercase text-right w-1/2">
                                    {selectedService === 'custom' ? 'Custom Build' : selectedService.replace('_', ' ')} 
                                    {selectedService === 'point_cloud' && ` (${pointCloudType})`}
                                    {selectedService === 'spectral' && ` (${spectralType})`}
                                </span>
                            </div>
                            
                            {/* Breakdown for Bundles and Custom */}
                            {(selectedService === 'all' || selectedService === 'custom') && bundleBreakdown.length > 0 && (
                                <div className="bg-black/30 p-4 border border-white/5 my-4 text-xs space-y-2">
                                    <div className="font-bold text-gray-500 uppercase tracking-widest mb-2">Item Breakdown</div>
                                    {bundleBreakdown.map((item, idx) => (
                                        <div key={idx} className="flex justify-between">
                                            <span className="text-gray-400">{item.label}</span>
                                            <span className="font-mono">₹{item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedService === 'custom' && customNotes && (
                                <div className="bg-black/30 p-4 border border-white/5 my-4 text-xs">
                                    <div className="font-bold text-gray-500 uppercase tracking-widest mb-1">Notes</div>
                                    <p className="text-gray-300 italic">"{customNotes}"</p>
                                </div>
                            )}
                            
                            <div className="h-px bg-white/10 my-4"></div>
                            
                            {selectedService === 'all' && calculatedPrice > 0 && (
                                <div className="flex justify-between text-sm text-gray-500 line-through">
                                    <span>Standard Total</span>
                                    <span className="font-mono">₹{calculatedPrice.toLocaleString()}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-end">
                                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Estimated Cost</span>
                                <span className="text-4xl font-display font-bold text-accluav-orange">
                                    ₹{(selectedService === 'all' ? discountedPrice : calculatedPrice).toLocaleString()}
                                </span>
                            </div>
                            
                            {selectedService === 'all' && (
                                <div className="text-right text-xs text-green-500 font-bold uppercase tracking-widest">
                                    30% bundle discount applied
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <button 
                            onClick={onRequestService}
                            className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors"
                        >
                            Proceed with Quote
                        </button>
                        
                        {/* Mandatory Accuracy Footer */}
                        <div className="bg-black/40 border border-white/5 p-4 rounded text-[10px] text-gray-400 font-mono space-y-3">
                            <div className="flex items-center gap-2 text-white">
                                <Check className="w-4 h-4 text-green-500" /> 
                                <span className="font-bold">GDS BETTER THAN 3cm / px</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-500 mt-0.5" /> 
                                <div>
                                    <span className="text-white font-bold">Positional Accuracy complied to SOI:</span>
                                    <div className="text-gray-500 ml-1 mt-1">
                                        (x,y &lt; 10cm) (z &lt; 20 cm)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Separated Rate Card / Price Sheet */}
        <AnimatePresence>
            {selectedService !== 'all' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 mt-8 border-t border-white/10 pt-12"
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-accluav-orange w-12"></div>
                            <h3 className="text-xl font-display font-bold uppercase tracking-widest flex items-center gap-3">
                                Standard Reference Rates
                            </h3>
                        </div>
                        
                        <div className="w-full overflow-hidden border border-white/10 bg-[#0a0a0a]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="py-5 px-8 text-xs font-bold font-display uppercase tracking-widest text-gray-500 w-1/2">Coverage Tier</th>
                                        <th className="py-5 px-8 text-xs font-bold font-display uppercase tracking-widest text-gray-500 text-right">Unit Rate (INR/HA)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getActiveTiers().map((tier, idx) => {
                                        const isActive = isRowActive(tier, getActiveTiers());
                                        return tier.header ? (
                                            <tr key={`head-${idx}`} className="bg-white/[0.02] border-b border-white/5">
                                                <td colSpan={2} className="py-4 px-8 text-sm font-bold text-accluav-orange uppercase tracking-widest font-display">
                                                    {tier.header}
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr 
                                                key={idx} 
                                                className={`transition-colors border-b border-white/5 ${
                                                    isActive 
                                                        ? 'bg-accluav-orange/10 border-accluav-orange/30' 
                                                        : 'hover:bg-white/[0.02]'
                                                }`}
                                            >
                                                <td className={`py-5 px-8 text-lg font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                    {tier.label}
                                                </td>
                                                <td className={`py-5 px-8 font-mono text-xl text-right tracking-tight ${isActive ? 'text-accluav-orange font-bold' : 'text-white'}`}>
                                                    ₹{tier.rate.toLocaleString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {selectedService === 'custom' && customServices.length === 0 && (
                                        <tr>
                                            <td colSpan={2} className="py-12 text-center text-gray-500 italic text-base">
                                                Select modules above to view applicable rates
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest text-right">
                            * Rates are indicative. Final quote subject to terrain analysis and airspace restrictions.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {services.map((service, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 group"
                >
                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accluav-orange/50 group-hover:text-accluav-orange transition-colors">
                        {service.icon}
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-white transition-colors">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* CTA */}
        <div className="bg-[#111] border border-white/10 p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Need Data Acquisition?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Our flight operations team can deploy within 48 hours to critical sites. Contact us for a consultation on your surveying needs.
            </p>
            <button 
                onClick={onRequestService}
                className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors inline-flex items-center gap-2"
            >
                Request Data Service <ArrowRight className="w-5 h-5" />
            </button>
        </div>

      </div>
    </div>
  );
};

export default GeographicalData;
