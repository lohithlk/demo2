
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, View } from 'lucide-react';
import { Product } from '../types';

// Use 'any' to bypass TS check for custom element instead of augmenting global JSX namespace
const ModelViewer = 'model-viewer' as any;

export const PRODUCTS: Product[] = [
  {
    id: '01',
    title: 'VINASHAK',
    category: 'KINETIC',
    description: 'Precision strike system with autonomous terminal guidance.',
    imageUrl: '/images/vinashak.png',
    modelUrl: '/3d-model/vinaashak.glb',
    specs: [
      { label: 'Range', value: '40 km' },
      { label: 'Endurance', value: '45 mins' },
      { label: 'Payload', value: '2.5 kg Warhead' },
      { label: 'Speed', value: '120 km/h' }
    ],
    features: [
      'Autonomous Terminal Guidance',
      'Swarm Interconnectivity',
      'Low Acoustic Signature',
      'Man-Portable Form Factor'
    ]
  },
  {
    id: '02',
    title: 'ACE - IV (VTOL)',
    category: 'INTELLIGENCE',
    description: 'Hybrid VTOL UAV with 120min endurance and modular payloads.',
    imageUrl: '/images/ace-iv.png',
    modelUrl: '/3d-model/vtol.glb',
    specs: [
        { label: 'Max Range', value: '150 km' },
        { label: 'Endurance', value: '120 mins' },
        { label: 'Comms Range', value: '15 km Encrypted' },
        { label: 'Max Altitude', value: '3000 m' },
        { label: 'MTOW', value: '15 kg' },
        { label: 'Wingspan', value: '2500 mm' },
        { label: 'Speed', value: '120 km/h' }
    ],
    features: [
        'Hybrid VTOL (Runway Independent)',
        'Carbon Fiber Frame (>2000 flights)',
        'Dual GPS & Waypoint Navigation',
        'Modular Payload System (See Configs)',
        'Rain & Dust Proof (-20°C to +55°C)',
        'Fail-Safe RTH (Low Battery/Comms Loss)',
        'Rapid Deployment (< 20 mins)',
        'Swappable Sensor Bay'
    ],
    details: [
        {
            title: 'Performance & Build',
            items: [
                { label: 'Max Takeoff Weight', value: '15 KGS' },
                { label: 'Max Altitude', value: '3000 meters' },
                { label: 'Wingspan', value: '2500 mm' },
                { label: 'Structure', value: 'Carbon Fiber Frame' },
                { label: 'Max Speed', value: '120 KMPH' },
                { label: 'Cruising Speed', value: '75 KMPH' },
                { label: 'Working Temp', value: '-20°C ~ 45°C' },
                { label: 'Wind Resistance', value: 'High Winds Capable' }
            ]
        },
        {
            title: 'Ground Control (GCS)',
            items: [
                { label: 'Connectivity', value: '15km Encrypted Data Link' },
                { label: 'Software', value: 'AI-Enhanced, Secure' },
                { label: 'Features', value: 'Live Telemetry & Video' },
                { label: 'Planning', value: 'Autonomous Waypoint Nav' },
                { label: 'Modes', value: 'Manual & Autonomous' }
            ]
        }
    ],
    visualSections: [
        {
            title: "ACE - IV VTOL Platform",
            description: "Engineered for India's toughest terrains. Versatile, reliable, and precise hybrid VTOL system.",
            imageUrl: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80",
            layout: 'full'
        },
        {
            title: "ACE - IV System View",
            description: "Full configuration view with modular payload bay accessible for rapid field swapping.",
            imageUrl: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?auto=format&fit=crop&q=80",
            layout: 'full'
        }
    ]
  },
  {
    id: '03',
    title: 'ACE-II',
    category: 'TACTICAL',
    description: 'Rapidly deployable fixed-wing system for squad-level overwatch.',
    imageUrl: '/images/ace-ii.png',
    modelUrl: '/3d-model/ace2.glb',
    specs: [
        { label: 'Range', value: '15 km' },
        { label: 'Endurance', value: '60 mins' },
        { label: 'Weight', value: '1.2 kg' },
        { label: 'Deployment', value: '< 2 mins' }
    ],
    features: [
        'Hand-Launched',
        'Deep Stall Landing',
        'EO/IR Gimbal',
        'Backpack Transportable'
    ]
  },
  {
    id: '04',
    title: 'LM-1',
    category: 'MUNITION',
    description: 'Precision engagement system with sustained target tracking.',
    imageUrl: '/images/lm1.png',
    modelUrl: '/3d-model/lm1.glb',
    specs: [
        { label: 'Loiter Time', value: '30 mins' },
        { label: 'Dive Speed', value: '150 km/h' },
        { label: 'Accuracy', value: '< 1m CEP' },
        { label: 'Warhead', value: 'Anti-Personnel / Anti-Armor' }
    ],
    features: [
        'Abort & Re-Engage Capability',
        'Silent Electric Propulsion',
        'Tube Launched',
        'Real-time Video Feed'
    ]
  },
  {
    id: '05',
    title: 'HEXACOPTER',
    category: 'MULTI-MISSION',
    description: 'Heavy-lift multi-rotor platform for logistics and surveillance.',
    imageUrl: '/images/hexacopter.png',
    modelUrl: '/3d-model/hexacopter.glb',
    specs: [
        { label: 'Payload Capacity', value: '15 kg' },
        { label: 'Endurance', value: '45 mins (Max Load)' },
        { label: 'Diameter', value: '1200 mm' },
        { label: 'Wind Resistance', value: '12 m/s' }
    ],
    features: [
        'Redundant Power Systems',
        'Heavy Drop Mechanism',
        'Tether Compatible',
        'LiDAR Integration Ready'
    ]
  },
  {
    id: '07',
    title: 'VINAASHAK - HL',
    category: 'C-UAS',
    description: 'Man-portable kinetic interceptor for immediate response against hostile drones and FPVs.',
    imageUrl: '/images/hl.png',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    specs: [
      { label: 'Engagement Range', value: '500 m' },
      { label: 'Speed', value: '216 km/h' },
      { label: 'Launcher Weight', value: '4 kg' },
      { label: 'Guidance', value: 'IR Thermal Seeker' }
    ],
    features: [
      'Rapid Deployment Counter-FPV',
      'AI Thermal Seeker',
      'Fire-and-Forget Engagement',
      'Lightweight, Rugged Construction'
    ],
    details: [
       {
           title: 'Technical Specifications',
           items: [
               { label: 'Launcher Weight', value: '4 KG' },
               { label: 'Interceptor Weight', value: '2.8 KG (With Warhead)' },
               { label: 'Engagement Range', value: 'Up to 500 M' },
               { label: 'Threat Class', value: 'Class 3 Multirotor & Fixed Wing UAVs' },
               { label: 'Guidance', value: 'Infrared Thermal Imaging Seeker' },
               { label: 'Strike Method', value: 'Kinetic Impact + Fire Damage Effect' },
               { label: 'Speed', value: '60 m/s (216 km/h)' },
               { label: 'Launch Mode', value: 'Hand Launched, Soldier Operated' }
           ]
       }
    ],
    visualSections: [
         {
            title: "VINAASHAK - HL Platform",
            description: "Designed for modern asymmetric battlefields, VINAASHAK HL kinetic interceptor provides frontline units with an immediate, portable, and hard kill response against hostile drones, FPVs, and low flying unmanned threats. Engineered for contested environments, it enables infantry, special forces, and mobile air defence teams to neutralise rogue drones within seconds, protecting troops, convoys, and critical assets without the need for heavy infrastructure or complex setup.",
            imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80",
            layout: 'full',
            specs: [
                { label: 'Role', value: 'Rapid Deployment C-UAS' },
                { label: 'Targeting', value: 'AI Thermal Seeker' },
                { label: 'Operation', value: 'Fire-and-Forget' },
                { label: 'Environment', value: 'Contested Battlefields' }
            ]
        }
    ]
  }
];

interface ProductShowcaseProps {
  onViewAll?: () => void;
  onProductClick?: (productId: string) => void;
  products?: Product[];
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onViewAll, onProductClick, products = PRODUCTS }) => {
  return (
    <section id="products" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h3 className="text-accluav-orange text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Capabilities
            </h3>
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-white mb-2 leading-[0.9]">
              DEFENCE
            </h2>
          </div>
          <button 
            onClick={onViewAll}
            className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-accluav-orange transition-colors mt-8 md:mt-0"
          >
            View All Systems <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              onClick={() => onProductClick && onProductClick(product.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 md:hidden flex justify-center">
             <button 
               onClick={onViewAll}
               className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-accluav-orange transition-colors"
             >
            View All Systems <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  index: number;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only navigate on double-click when not hovering over 3D model
    if (!isHovered && onClick) {
      onClick();
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    // Support Enter key to open product detail
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (!isHovered && onClick) onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative h-[500px] w-full overflow-hidden bg-white/5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onDoubleClick={handleCardDoubleClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* 3D Model Viewer Layer - Only visible if modelUrl exists and hovered */}
      {product.modelUrl && isHovered ? (
        <div className="absolute inset-0 z-20 bg-black/90 transition-opacity duration-300">
          <div
           role="button"
           tabIndex={0}
           aria-label={`Open ${product.title} details`}
           onDoubleClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            if (onClick) onClick();
           }}
           onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              if (onClick) onClick();
            }
           }}
           className="w-full h-full"
          >
           <ModelViewer
             src={product.modelUrl}
             camera-controls
             auto-rotate
             ar
             ar-modes="webxr scene-viewer quick-look"
             interaction-prompt="none"
             shadow-intensity="1"
             environment-image="neutral"
             alt={`3D model of ${product.title}`}
             style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
           >
           </ModelViewer>
          </div>
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2 pointer-events-none">
            <span className="bg-accluav-orange text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <Box className="w-3 h-3" /> INTERACTIVE 3D
            </span>
          </div>
           
          {/* AR Hint (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
             <div className="bg-black/50 backdrop-blur px-3 py-1 text-[10px] text-gray-300 border border-white/10 rounded">
                CLICK TO VIEW DETAILS
             </div>
          </div>
        </div>
      ) : (
        /* Static Image Layer */
        <>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </>
      )}

      {/* Content */}
      <div className={`absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full z-10 pointer-events-none ${product.modelUrl && isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div>
          <span className="text-xs font-bold text-accluav-orange tracking-widest uppercase mb-2 block">
            {product.category}
          </span>
          <h3 className="text-3xl font-display font-bold text-white transition-colors">
            {product.title}
          </h3>
          {/* Description and View Specs link removed to keep visual cleanliness */}
        </div>
      </div>
      
      {/* Index Number */}
      <div className="absolute top-6 right-6 text-white/20 font-display font-bold text-xl z-10 pointer-events-none">
        {product.id}
      </div>

      {/* 3D Indicator Icon (if model exists but not active) */}
      {product.modelUrl && !isHovered && (
         <div className="absolute top-6 left-6 text-white/70 z-10 bg-black/40 backdrop-blur-sm p-2 rounded-full border border-white/10 group-hover:text-accluav-orange transition-colors">
            <View className="w-5 h-5" />
         </div>
      )}
    </motion.div>
  );
};

export default ProductShowcase;
