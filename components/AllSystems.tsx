
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from './ProductShowcase';
import { Product } from '../types';

interface AllSystemsProps {
  onBack: () => void;
  onProductClick: (productId: string) => void;
  products: Product[];
}

const AllSystems: React.FC<AllSystemsProps> = ({ onBack, onProductClick, products }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24">
      <div className="container mx-auto px-6 py-12">
         
         <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
         >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
         </button>

         <div className="mb-12 border-b border-white/10 pb-8">
             <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight uppercase">
                 Autonomous Systems
             </h1>
             <p className="text-xl text-gray-400 mt-4">Full Spectrum Dominance</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
               <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  onClick={() => onProductClick(product.id)}
               />
            ))}
         </div>
         
         <div className="mt-20 border-t border-white/10 pt-12 text-center">
             <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                 All systems listed above are available for authorized defense and government partners. 
                 Specific capability specifications are classified and available upon request via secure channels.
             </p>
         </div>
      </div>
    </div>
  );
};

export default AllSystems;
