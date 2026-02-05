
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, Target, Zap, Mountain, Wind, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductVariantSelectorProps {
  products: Product[];
  family: 'vinashak' | 'ace';
  onSelect: (productId: string) => void;
  onClose: () => void;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({ products, family, onSelect, onClose }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  let variants: { product: Product; label: string; icon: React.ReactNode; tagline: string }[] = [];
  let title = "";

  if (family === 'vinashak') {
      const standardVinashak = products.find(p => p.id === '01');
      const heavyLiftVinashak = products.find(p => p.id === '07');
      
      title = "VINASHAK SYSTEM FAMILY";
      
      if (standardVinashak && heavyLiftVinashak) {
          variants = [
            {
              product: standardVinashak,
              label: 'STANDARD CONFIGURATION',
              icon: <Zap className="w-6 h-6" />,
              tagline: 'Precision Kinetic Loitering Munition'
            },
            {
              product: heavyLiftVinashak,
              label: 'HL CONFIGURATION',
              icon: <Target className="w-6 h-6" />,
              tagline: 'Man-Portable C-UAS Interceptor'
            }
          ];
      }
  } else if (family === 'ace') {
      const aceIV = products.find(p => p.id === '02');
      const aceII = products.find(p => p.id === '03');

      title = "ACE AERIAL PLATFORMS";

      if (aceIV && aceII) {
          variants = [
            {
              product: aceIV,
              label: 'ACE-IV STRATEGIC',
              icon: <Mountain className="w-6 h-6" />,
              tagline: 'Long-Range Hybrid VTOL ISR System'
            },
            {
              product: aceII,
              label: 'ACE-II TACTICAL',
              icon: <Wind className="w-6 h-6" />,
              tagline: 'Hand-Launched Fixed Wing Overwatch'
            }
          ];
      }
  }

  if (variants.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={onClose}
          className="flex items-center text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest bg-black/50 backdrop-blur-sm px-4 py-3 border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </div>

      {/* Close X Button */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors p-2"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="w-full max-w-7xl">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <h2 className="text-accluav-orange text-sm font-bold tracking-[0.3em] uppercase mb-4">Select Platform Configuration</h2>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase">{title}</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {variants.map((variant, index) => (
            <motion.div
              key={variant.product.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onClick={() => onSelect(variant.product.id)}
              className="group relative h-[500px] border border-white/10 bg-white/5 overflow-hidden cursor-pointer hover:border-accluav-orange/50 transition-colors"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                    src={variant.product.imageUrl} 
                    alt={variant.product.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                  <div className="mb-auto w-full flex justify-between items-start">
                      <div className="bg-accluav-orange text-black font-bold text-xs px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                          {variant.icon} {variant.label}
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                          <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                  </div>

                  <div>
                      <h3 className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">{variant.product.title}</h3>
                      <p className="text-gray-300 text-lg font-medium mb-6">{variant.tagline}</p>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 w-full">
                          {variant.product.specs?.slice(0, 2).map((spec, i) => (
                              <div key={i}>
                                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{spec.label}</div>
                                  <div className="text-white font-mono">{spec.value}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductVariantSelector;
