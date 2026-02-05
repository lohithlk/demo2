
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Trophy, Code } from 'lucide-react';
import { Hackathon } from '../types';

interface HackathonListProps {
  hackathons: Hackathon[];
  onHackathonClick: (id: string) => void;
  onBack: () => void;
}

const HackathonList: React.FC<HackathonListProps> = ({ hackathons, onHackathonClick, onBack }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-b border-white/10 pb-12"
        >
            <span className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block">Student Innovation Program</span>
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase mb-4">
                The Arena
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
                Compete against the best minds in autonomy, AI, and robotics. Build real-world defense solutions and get discovered.
            </p>
        </motion.div>

        {hackathons.length === 0 ? (
           <div className="text-center py-20 bg-white/5 border border-white/10">
               <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
               <h3 className="text-xl font-bold mb-2">No Active Operations</h3>
               <p className="text-gray-500">Check back later for upcoming deployment challenges.</p>
           </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {hackathons.map((hackathon, index) => (
                    <motion.div 
                        key={hackathon.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onHackathonClick(hackathon.id)}
                        className="bg-[#111] border border-white/10 group cursor-pointer flex flex-col h-full hover:border-accluav-orange/50 transition-colors relative overflow-hidden"
                    >
                        <div className="aspect-[21/9] overflow-hidden bg-gray-900 relative">
                            <img 
                                src={hackathon.imageUrl} 
                                alt={hackathon.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0" 
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`text-black text-xs font-bold uppercase tracking-widest px-2 py-1 ${hackathon.status === 'upcoming' ? 'bg-green-500' : hackathon.status === 'ongoing' ? 'bg-accluav-orange' : 'bg-gray-500'}`}>
                                    {hackathon.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-mono mb-6 border-b border-white/5 pb-6">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accluav-orange" /> {hackathon.date}</span>
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accluav-orange" /> {hackathon.venue}</span>
                                <span className="flex items-center gap-2 text-white font-bold"><Trophy className="w-4 h-4 text-yellow-500" /> {hackathon.prizePool}</span>
                            </div>
                            
                            <h2 className="text-3xl font-display font-bold mb-4 group-hover:text-white transition-colors">
                                {hackathon.title}
                            </h2>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                {hackathon.description}
                            </p>
                            
                            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accluav-orange mt-auto">
                                View Challenge <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HackathonList;
