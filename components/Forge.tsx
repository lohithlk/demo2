
import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Cpu, Code } from 'lucide-react';
import WorkWithUsLayout from './WorkWithUsLayout';

interface ForgeProps {
  onBackHome: () => void;
  onNavigate: (page: 'careers' | 'life' | 'forge' | 'skillbridge') => void;
}

const Forge: React.FC<ForgeProps> = ({ onBackHome, onNavigate }) => {
  return (
    <WorkWithUsLayout activePage="forge" onNavigate={onNavigate} onBackHome={onBackHome}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
        
        <div className="px-8 lg:px-20 py-24 lg:py-32 border-b border-white/10">
            <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">Internship & New Grads</span>
            <h1 className="text-6xl md:text-9xl font-display font-black leading-[0.9] mb-8">
                THE FORGE
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                The Forge is AccelUAV's elite early-career program. We don't do coffee runs. You will ship code to flight hardware, design kinetic systems, and solve problems that matter from Day 1.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
             <div className="p-12 hover:bg-white/5 transition-colors">
                 <Hammer className="w-8 h-8 text-accluav-orange mb-6" />
                 <h3 className="text-xl font-bold mb-4 font-display uppercase">Mechanical</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                     Design airframes, propulsion systems, and ruggedized enclosures. Work with composites and additive manufacturing.
                 </p>
             </div>
             <div className="p-12 hover:bg-white/5 transition-colors">
                 <Code className="w-8 h-8 text-accluav-orange mb-6" />
                 <h3 className="text-xl font-bold mb-4 font-display uppercase">Software</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                     Build the RLTM Engine. Work on computer vision, sensor fusion, and real-time flight control algorithms.
                 </p>
             </div>
             <div className="p-12 hover:bg-white/5 transition-colors">
                 <Cpu className="w-8 h-8 text-accluav-orange mb-6" />
                 <h3 className="text-xl font-bold mb-4 font-display uppercase">Electrical</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                     PCB design, RF systems, and power management for high-performance autonomous vehicles.
                 </p>
             </div>
        </div>

        <div className="px-8 lg:px-20 py-24 bg-[#080808]">
            <h2 className="text-3xl font-display font-bold mb-12">Program Details</h2>
            <div className="space-y-8 max-w-3xl">
                <div className="flex gap-6 items-start">
                    <div className="w-12 text-accluav-orange font-mono font-bold">01</div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">12 Weeks of Intensity</h4>
                        <p className="text-gray-500">A rigorous summer program designed to accelerate your growth. You are embedded directly into product teams.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 text-accluav-orange font-mono font-bold">02</div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">Mentorship</h4>
                        <p className="text-gray-500">1:1 mentorship from senior engineers who have built systems for the most demanding environments on Earth.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 text-accluav-orange font-mono font-bold">03</div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">Full-Time Offers</h4>
                        <p className="text-gray-500">The Forge is our primary pipeline for full-time talent. Prove yourself here, and you have a place at AccelUAV.</p>
                    </div>
                </div>
            </div>

            <button onClick={() => onNavigate('careers')} className="mt-16 border border-white/20 px-8 py-4 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Apply to The Forge
            </button>
        </div>

      </motion.div>
    </WorkWithUsLayout>
  );
};

export default Forge;
