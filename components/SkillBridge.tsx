
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, BookOpen } from 'lucide-react';
import WorkWithUsLayout from './WorkWithUsLayout';

interface SkillBridgeProps {
  onBackHome: () => void;
  onNavigate: (page: 'careers' | 'life' | 'forge' | 'skillbridge') => void;
}

const SkillBridge: React.FC<SkillBridgeProps> = ({ onBackHome, onNavigate }) => {
  return (
    <WorkWithUsLayout activePage="skillbridge" onNavigate={onNavigate} onBackHome={onBackHome}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
        
        <div className="px-8 lg:px-20 py-24 lg:py-32 bg-[#050505]">
            <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">Military Transition</span>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.9] mb-8">
                SKILLBRIDGE <br/> FELLOWSHIP
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
                AccelUAV is an authorized DoD SkillBridge industry partner. We provide active duty service members the opportunity to gain valuable civilian work experience during their last 180 days of service.
            </p>
            <div className="inline-block border border-accluav-orange/50 px-4 py-2 text-accluav-orange text-xs font-bold uppercase tracking-widest rounded bg-accluav-orange/5">
                DoD Authorized Partner
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="px-8 lg:px-20 py-24 border-t border-r border-white/10">
                <ShieldCheck className="w-12 h-12 text-white mb-8" />
                <h2 className="text-3xl font-display font-bold mb-6">Mission Continuation</h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                    You've served your country. Now, continue the mission by building the tools that protect your brothers and sisters in arms. Your operational experience is invaluable to our engineering process.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                        <span className="w-1.5 h-1.5 bg-accluav-orange mr-4"></span> Operations & Testing
                    </li>
                    <li className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                        <span className="w-1.5 h-1.5 bg-accluav-orange mr-4"></span> Program Management
                    </li>
                    <li className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                        <span className="w-1.5 h-1.5 bg-accluav-orange mr-4"></span> Strategy & Business Dev
                    </li>
                </ul>
            </div>
            <div className="relative min-h-[400px] bg-gray-900 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1626296185686-258019b88236?auto=format&fit=crop&q=80" alt="Military" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
        </div>

        <div className="px-8 lg:px-20 py-24 bg-white/5 border-t border-white/10">
             <h2 className="text-2xl font-display font-bold mb-8">How to Apply</h2>
             <div className="grid gap-6 md:grid-cols-3">
                 <div className="bg-black p-8 border border-white/10">
                     <div className="text-accluav-orange font-display font-bold text-xl mb-4">01</div>
                     <h4 className="font-bold mb-2">Command Approval</h4>
                     <p className="text-xs text-gray-500">Obtain approval from your chain of command to participate in the SkillBridge program.</p>
                 </div>
                 <div className="bg-black p-8 border border-white/10">
                     <div className="text-accluav-orange font-display font-bold text-xl mb-4">02</div>
                     <h4 className="font-bold mb-2">Submit Interest</h4>
                     <p className="text-xs text-gray-500">Email us with your resume, service dates, and desired areas of focus.</p>
                 </div>
                 <div className="bg-black p-8 border border-white/10">
                     <div className="text-accluav-orange font-display font-bold text-xl mb-4">03</div>
                     <h4 className="font-bold mb-2">Interview</h4>
                     <p className="text-xs text-gray-500">Interview with our team to find the best fit for your skills and our needs.</p>
                 </div>
             </div>
             <div className="mt-12">
                 <a href="mailto:skillbridge@acceluav.com" className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors inline-block">
                     Contact SkillBridge Team
                 </a>
             </div>
        </div>

      </motion.div>
    </WorkWithUsLayout>
  );
};

export default SkillBridge;
