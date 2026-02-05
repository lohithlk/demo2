
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, ArrowRight } from 'lucide-react';
import WorkWithUsLayout from './WorkWithUsLayout';

interface LifeAtAcceluavProps {
  onBackHome: () => void;
  onNavigate: (page: 'careers' | 'life' | 'forge' | 'skillbridge') => void;
}

const LifeAtAcceluav: React.FC<LifeAtAcceluavProps> = ({ onBackHome, onNavigate }) => {
  return (
    <WorkWithUsLayout activePage="life" onNavigate={onNavigate} onBackHome={onBackHome}>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="w-full"
      >
        {/* Hero */}
        <div className="px-8 lg:px-20 py-24 lg:py-32 relative overflow-hidden">
             <div className="relative z-10 max-w-4xl">
                <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">Our DNA</span>
                <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-8">
                    ENGINEERING <br/>
                    THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accluav-orange to-red-600">UNTHINKABLE</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                    Life at AccelUAV is not for the faint of heart. We are a team of obsessives, tinkers, and patriots dedicated to solving the hardest problems in national security.
                </p>
             </div>
             <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gray-900 to-transparent opacity-30 pointer-events-none"></div>
        </div>

        {/* Culture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-y border-white/10">
             <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors group">
                <Target className="w-8 h-8 text-accluav-orange mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">Mission First</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                    We don't build gadgets. We build capabilities that protect lives. Every line of code, every solder joint, every decision is weighed against the mission.
                </p>
             </div>
             <div className="p-12 border-b md:border-b-0 lg:border-r border-white/10 hover:bg-white/5 transition-colors group">
                <Zap className="w-8 h-8 text-accluav-orange mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">Radical Velocity</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                    The modern battlefield changes fast. We change faster. We iterate, test, and deploy at speeds traditional defense contractors deem impossible.
                </p>
             </div>
             <div className="p-12 hover:bg-white/5 transition-colors group">
                <Users className="w-8 h-8 text-accluav-orange mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">High Agency</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                    We hire owners, not employees. You identify the problem, you build the solution, you own the outcome. No bureaucracy, just results.
                </p>
             </div>
        </div>

        {/* Gallery Section */}
        <div className="px-8 lg:px-20 py-24">
             <h2 className="text-4xl font-display font-bold mb-12">Inside The Forge</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                 <div className="bg-gray-900 h-full relative group overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Tech" />
                     <div className="absolute bottom-6 left-6">
                        <span className="text-xs font-bold text-accluav-orange uppercase tracking-widest">Lab 01</span>
                        <h4 className="text-xl font-bold">Hardware Integration</h4>
                     </div>
                 </div>
                 <div className="grid grid-rows-2 gap-4 h-full">
                     <div className="bg-gray-900 w-full h-full relative group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Soldering" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-xs font-bold text-accluav-orange uppercase tracking-widest">Prototyping</span>
                            <h4 className="text-xl font-bold">Rapid Iteration</h4>
                        </div>
                     </div>
                     <div className="bg-gray-900 w-full h-full relative group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Meeting" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-xs font-bold text-accluav-orange uppercase tracking-widest">War Room</span>
                            <h4 className="text-xl font-bold">Strategy & Ops</h4>
                        </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Benefits CTA */}
        <div className="px-8 lg:px-20 py-24 bg-white/5 border-t border-white/10">
             <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Build?</h2>
                 <p className="text-gray-400 mb-12 text-lg">
                     We offer competitive equity, comprehensive health benefits, and the resources you need to do the best work of your life.
                 </p>
                 <button onClick={() => onNavigate('careers')} className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors">
                     View All Open Roles
                 </button>
             </div>
        </div>
      </motion.div>
    </WorkWithUsLayout>
  );
};

export default LifeAtAcceluav;
