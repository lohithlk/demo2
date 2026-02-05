
import React from 'react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-24 mt-12"
        >
            <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">Our Purpose</span>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8">
                SECURING THE <br /> FUTURE
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
                We exist to enable the United States and its allies to maintain deterrence in an era of rapid technological change.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden group">
                 <img src="https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80" alt="Engineering" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                 <div className="absolute bottom-6 left-6">
                     <h3 className="text-2xl font-display font-bold">Innovation at Speed</h3>
                 </div>
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-display font-bold mb-6">The Speed of Relevance</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                    Traditional defense acquisition takes years. Our adversaries operate in weeks. AccelUAV bridges this gap by applying modern software engineering principles to hardware development. We iterate, test, and deploy faster than any legacy prime contractor.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Our modular architecture allows us to upgrade capabilities over the air, ensuring that our systems actually get better over time, not obsolete.
                </p>
            </div>
        </div>

        <div className="border-t border-white/10 pt-24">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 p-8 border border-white/10 hover:border-accluav-orange/50 transition-colors">
                    <span className="text-4xl font-display font-bold text-white/20 mb-4 block">01</span>
                    <h4 className="text-xl font-bold mb-4">Mission First</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We prioritize mission success above all else. If a technology doesn't solve a real problem for the operator down-range, we don't build it.
                    </p>
                </div>
                <div className="bg-white/5 p-8 border border-white/10 hover:border-accluav-orange/50 transition-colors">
                    <span className="text-4xl font-display font-bold text-white/20 mb-4 block">02</span>
                    <h4 className="text-xl font-bold mb-4">Software Defined</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Hardware is the body; software is the soul. Our RLTM software allows disparate systems to act as a cohesive, intelligent network.
                    </p>
                </div>
                <div className="bg-white/5 p-8 border border-white/10 hover:border-accluav-orange/50 transition-colors">
                    <span className="text-4xl font-display font-bold text-white/20 mb-4 block">03</span>
                    <h4 className="text-xl font-bold mb-4">Cost Efficiency</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We believe that mass matters. By reducing the cost per unit, we enable the deployment of large-scale autonomous swarms that overwhelm traditional defenses.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
