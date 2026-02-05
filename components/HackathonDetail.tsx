
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Trophy, CheckCircle, Upload } from 'lucide-react';
import { Hackathon, HackathonApplication } from '../types';

interface HackathonDetailProps {
  hackathon: Hackathon;
  onBack: () => void;
  onApply: (application: HackathonApplication) => void;
}

const HackathonDetail: React.FC<HackathonDetailProps> = ({ hackathon, onBack, onApply }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    teamName: '',
    githubLink: '',
    linkedinLink: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: HackathonApplication = {
      id: `h-app-${Date.now()}`,
      hackathonId: hackathon.id,
      hackathonTitle: hackathon.title,
      applicantName: formData.applicantName,
      email: formData.email,
      teamName: formData.teamName,
      githubLink: formData.githubLink,
      linkedinLink: formData.linkedinLink,
      status: 'pending'
    };
    onApply(newApp);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
       {/* Hero */}
       <div className="w-full h-[40vh] relative overflow-hidden">
            <img 
                src={hackathon.imageUrl} 
                alt={hackathon.title} 
                className="w-full h-full object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accluav-black via-accluav-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                <div className="container mx-auto">
                    <button 
                        onClick={onBack}
                        className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arena
                    </button>
                    <div className="flex gap-4 mb-4">
                         <span className="bg-accluav-orange text-black text-xs font-bold uppercase tracking-widest px-3 py-1">
                            {hackathon.status}
                        </span>
                        <span className="border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                            Prize: {hackathon.prizePool}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold max-w-4xl leading-tight">
                        {hackathon.title}
                    </h1>
                </div>
            </div>
       </div>

       <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Details */}
           <div className="lg:col-span-7">
               <div className="flex flex-wrap gap-8 border-b border-white/10 pb-8 mb-8">
                   <div>
                       <div className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Date</div>
                       <div className="flex items-center gap-2 text-xl font-mono"><Calendar className="w-5 h-5 text-accluav-orange" /> {hackathon.date}</div>
                   </div>
                   <div>
                       <div className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Venue</div>
                       <div className="flex items-center gap-2 text-xl font-mono"><MapPin className="w-5 h-5 text-accluav-orange" /> {hackathon.venue}</div>
                   </div>
               </div>

               <div className="prose prose-invert prose-lg max-w-none">
                   <h3 className="text-white font-display uppercase tracking-widest text-sm font-bold">Mission Brief</h3>
                   <p className="text-gray-400 text-lg leading-relaxed mb-8">{hackathon.description}</p>
                   
                   {hackathon.requirements && (
                       <>
                           <h3 className="text-white font-display uppercase tracking-widest text-sm font-bold mb-4">Requirements & Tracks</h3>
                           <ul className="space-y-4">
                               {hackathon.requirements.map((req, i) => (
                                   <li key={i} className="flex items-start gap-4 text-gray-400">
                                       <span className="w-1.5 h-1.5 bg-accluav-orange rounded-full mt-2.5 flex-shrink-0"></span>
                                       {req}
                                   </li>
                               ))}
                           </ul>
                       </>
                   )}
               </div>
           </div>

           {/* Registration Form */}
           <div className="lg:col-span-5">
               <div className="bg-[#111] border border-white/10 p-8 sticky top-24">
                   <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                       <Trophy className="w-5 h-5 text-accluav-orange" /> Registration
                   </h3>
                   
                   {isSubmitted ? (
                        <div className="text-center py-12">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Application Received</h4>
                            <p className="text-gray-500 mb-6">Our team will review your submission and contact you shortly.</p>
                            <button onClick={onBack} className="text-accluav-orange text-xs font-bold uppercase tracking-widest hover:text-white">
                                Return to Arena
                            </button>
                        </div>
                   ) : (
                       <form onSubmit={handleSubmit} className="space-y-5">
                           <div>
                               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Full Name</label>
                               <input required type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white placeholder-white/20" placeholder="John Doe" />
                           </div>
                           <div>
                               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">University Email</label>
                               <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white placeholder-white/20" placeholder="john@edu.in" />
                           </div>
                           <div>
                               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Team Name (Optional)</label>
                               <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white placeholder-white/20" placeholder="Team Alpha" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                               <div>
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">GitHub / Portfolio</label>
                                   <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white placeholder-white/20" placeholder="https://..." />
                               </div>
                               <div>
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">LinkedIn</label>
                                   <input type="url" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white placeholder-white/20" placeholder="https://..." />
                               </div>
                           </div>

                           <div className="pt-4">
                               <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-accluav-orange hover:text-white transition-colors text-sm">
                                   Submit Application
                               </button>
                               <p className="text-[10px] text-gray-600 text-center mt-3">By applying you agree to the competition terms.</p>
                           </div>
                       </form>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};

export default HackathonDetail;
